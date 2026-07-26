import { useEffect, useState } from "react";
import CalificarEstrellas from "../components/CalificacionStars";
import ReseniaForm from "../components/ReseniaForm";
import { useParams } from "react-router-dom";
import { librosService } from "../services/libro.service";
import { actualizarResenia } from "../services/detalle.libro.service";
import type { AxiosResponse } from "axios";
import type { Libro } from "../types/Libro.type";

export default function DetalleLibro() {
  const { id } = useParams()
  const libroId : number = Number(id)

  const [libro, setLibro] = useState<any>(null);
  const [puntaje, setPuntaje] = useState(0);
  const [resenia, setResenia] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const cargarLibro = async () => {
      if (Number.isNaN(libroId))
      {
        return <p> No se encontró el ID del libro </p>;
      }

      const response = await librosService.getLibroPorId(libroId);
      const data = await response;

      if (!data) {return <p> No hay nada para mostrar </p>; }
      setLibro(data);

      if (data.puntaje == undefined || Number.isNaN(data.puntaje))
        {
          setPuntaje(0);
        }
        else {
        setPuntaje(data.puntaje);
        }

      if(data.resenia == undefined)
      {
        setResenia("Sin reseña");
      } else {
      setResenia(data.resenia);}
    };

    cargarLibro();
  }, [libroId]);

  const guardarCambios = async () => {
    try {
      setGuardando(true);
      setMensaje("");

      const response: AxiosResponse<Libro>|undefined = await actualizarResenia(libroId, resenia, puntaje);
        
      if (!response || response.status < 200 || response.status >= 300) {
        throw new Error("No se pudo actualizar");
      }

      setMensaje("Guardado correctamente");
    } catch (error) {
      console.error(error);
      setMensaje("Ocurrió un error al guardar");
    } finally {
      setGuardando(false);
    }
  };

  if (!libro) {
    return <p> Cargando...</p>;
  }

  return (
    <div className="py-8 px-4">
      <div className="max-w-2xl mx-auto bg-blanco rounded-xl shadow p-6 flex flex-col gap-5">
        <div>
          <h1 className="font-serif text-3xl font-bold text-text mb-1">{libro.titulo}</h1>
          <p className="text-text-light text-sm">{libro.autor}</p>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-text">Tu calificación</label>
          <CalificarEstrellas puntaje={puntaje} onChange={setPuntaje} />
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-text">Tu reseña</label>
          <ReseniaForm resenia={resenia} onChange={setResenia} />
        </div>

        <button
          onClick={guardarCambios}
          disabled={guardando}
          className="w-full h-12 bg-primary text-blanco rounded-lg font-medium hover:bg-primary-hover transition-colors disabled:opacity-50 cursor-pointer"
        >
          {guardando ? "Guardando..." : "Guardar cambios"}
        </button>

        {mensaje && <p className={`text-sm ${mensaje.includes("error") ? "text-red-500" : "text-primary"}`}>{mensaje}</p>}
      </div>
    </div>
  );
}
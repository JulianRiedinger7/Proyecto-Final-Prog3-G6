import { useEffect, useState } from "react";
import CalificarEstrellas from "../components/CalificacionStars";
import ReseniaForm from "../components/ReseniaForm";

export default function DetalleLibro() {
  const libroId = 1;

  const [libro, setLibro] = useState<any>(null);
  const [puntaje, setPuntaje] = useState(0);
  const [resenia, setResenia] = useState("");
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const cargarLibro = async () => {
      const response = await fetch(`http://localhost:3000/api/libros/${libroId}`);
      const data = await response.json();

      setLibro(data);
      setPuntaje(data.puntaje);
      setResenia(data.resenia);
    };

    cargarLibro();
  }, [libroId]);

  const guardarCambios = async () => {
    try {
      setGuardando(true);
      setMensaje("");

      const response = await fetch(`http://localhost:3000/api/libros/${libroId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ puntaje, resenia }),
      });

      if (!response.ok) {
        throw new Error("No se pudo guardar");
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
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h1>{libro.titulo}</h1>
      <h2>{libro.autor}</h2>

      <CalificarEstrellas puntaje={puntaje} onChange={setPuntaje} />

      <ReseniaForm resenia={resenia} onChange={setResenia} />

      <button onClick={guardarCambios} disabled={guardando}>
        {guardando ? "Guardando..." : "Guardar cambios"}
      </button>

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}
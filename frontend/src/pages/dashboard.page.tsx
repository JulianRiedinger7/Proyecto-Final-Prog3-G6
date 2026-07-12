import { obtenerEstadisticas, obtenerLibrosLeyendo } from "../services/estadisticas.service";
import { useEffect, useState } from "react";
import type { Estadisticas } from "../types/Estadisticas.type";
import type { Libro } from "../types/Libro.type";
import { StatsCard } from "../components/statsCard";

export const DashboardPage = () => {
  const [estadisticas, setEstadisticas] = useState<Estadisticas | null>(null);
  const [leyendo, setLeyendo] = useState<Libro[]>([]);

  useEffect(() => {
    const fetchEstadisticas = async () => {
      try {
        const data = await obtenerEstadisticas();
        setEstadisticas(data);
      } catch (error) {
        console.error("Error al obtener las estadísticas:", error);
      }
    };

    const fetchLeyendo = async () => {
      try {
        const data = await obtenerLibrosLeyendo();
        console.log(data);
        setLeyendo(data);
      } catch (error) {
        console.error("Error al obtener los libros en lectura:", error);
      }
    };

    fetchEstadisticas();
    fetchLeyendo();
  }, []);

  return (
    <div>
      <h1 className="text-5xl text-primary m-4 font-bold">Dashboard</h1>
      {estadisticas ? (
        <div className="flex flex-col justify-center items-center md:flex-row">
          <StatsCard titulo="Total Libros" valor={estadisticas.TotalLibros} />
          <StatsCard titulo="Leyendo" valor={estadisticas.LibrosLeyendo} />
          <StatsCard titulo="Leidos" valor={estadisticas.LibrosLeidos} />
        </div>
      ) : (
        <p>Cargando estadísticas...</p>
      )}

      {leyendo.length > 0 ? (
        <div>
          <h3 className="text-xl font-bold mb-2">Continuar Leyendo</h3>
          <ul>
            {leyendo.map((libro) => (
              // ACA DEBERIA USARSE UN COMPONENTE DE LIBRO
              <li key={libro.id}>{libro.titulo}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No hay libros en lectura.</p>
      )}
    </div>
  );
};

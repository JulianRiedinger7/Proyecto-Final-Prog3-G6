import { obtenerEstadisticas, obtenerLibrosLeyendo } from "../services/estadisticas.service";
import { useEffect, useState } from "react";
import type { Estadisticas } from "../types/Estadisticas.type";
import type { Libro } from "../types/Libro.type";
import { StatsCard } from "../components/common/statsCard";
import { BookCard } from "../components/common/bookCard";

export const DashboardPage = () => {
  const [estadisticas, setEstadisticas] = useState<Estadisticas | null>(null);
  const [libros, setLibros] = useState<Libro[]>([]);

  useEffect(() => {
    const fetchEstadisticas = async () => {
      try {
        const data = await obtenerEstadisticas();
        setEstadisticas(data);
      } catch (error) {
        console.error("Error al obtener las estadísticas:", error);
      }
    };

    const fetchLibros = async () => {
      try {
        const data = await obtenerLibrosLeyendo();
        setLibros(data);
      } catch (error) {
        console.error("Error al obtener los libros en lectura:", error);
      }
    };

    fetchEstadisticas();
    fetchLibros();
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

      {libros.length > 0 ? (
        <div>
          <h3 className="text-xl font-bold m-4">Continuar Leyendo</h3>
          <ul className="flex flex-col items-center md:flex-row md:flex-wrap justify-center">
            {libros.map((libro) => (
              <BookCard key={libro.id} libro={libro} />
            ))}
          </ul>
        </div>
      ) : (
        <p>No hay libros en lectura.</p>
      )}
    </div>
  );
};

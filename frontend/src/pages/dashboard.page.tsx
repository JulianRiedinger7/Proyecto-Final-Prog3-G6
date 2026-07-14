import { obtenerEstadisticas, obtenerLibrosLeyendo } from "../services/estadisticas.service";
import { useEffect, useState } from "react";
import type { Estadisticas } from "../types/Estadisticas.type";
import type { Libro } from "../types/Libro.type";
import { StatsCard } from "../components/common/statsCard";
import { BookCard } from "../components/common/bookCard";
import { Link } from "react-router-dom";

export const DashboardPage = () => {
  const [estadisticas, setEstadisticas] = useState<Estadisticas | null>(null);
  const [libros, setLibros] = useState<Libro[]>([]);

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const [estadisticasData, librosData] = await Promise.all([
          obtenerEstadisticas(),
          obtenerLibrosLeyendo(),
        ]);
        setEstadisticas(estadisticasData);
        setLibros(librosData);
      } catch (error) {
        console.error("Error al obtener los datos del dashboard:", error);
      }
    };

    fetchDatos();
  }, []);

  return (
    <section>
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
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold m-4">Continuar Leyendo</h3>
            <Link
              to="/mejor-calificados"
              className="text-primary hover:text-accent transition-colors duration-300 m-4"
            >
              Ver mejor calificados
            </Link>
          </div>
          {/* Aca van las pills con los filtros de generos */}
          <ul className="flex flex-col items-center md:flex-row md:flex-wrap justify-center">
            {libros.map((libro) => (
              <BookCard key={libro.id} libro={libro} />
            ))}
          </ul>
        </div>
      ) : (
        <p>No hay libros en lectura.</p>
      )}
    </section>
  );
};

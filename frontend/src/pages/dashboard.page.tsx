import { obtenerLibrosLeyendo } from "../services/estadisticas.service";
import { useNavigate } from "react-router-dom";
import { generoService } from "../services/genero.service";
import { useEffect, useState } from "react";
import type { Libro } from "../types/Libro.type";
import type { Genero } from "../types/Genero.type";
import { BookCard } from "../components/common/bookCard";
import { Link } from "react-router-dom";
import { GeneroPill } from "../components/common/generoPill";
import { useAuth } from "../hooks/useAuth";

export const DashboardPage = () => {
  const [libros, setLibros] = useState<Libro[]>([]);
  const [generos, setGeneros] = useState<Genero[]>([]);
  const [generoSeleccionado, setGeneroSeleccionado] = useState<number>(0);
  const { usuario } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDatos = async () => {
      try {
        const [librosData, generosData] = await Promise.all([
          obtenerLibrosLeyendo(),
          generoService.obtenerGeneros(),
        ]);
        setLibros(librosData);
        setGeneros(generosData);
      } catch (error) {
        console.error("Error al obtener los datos del dashboard:", error);
      }
    };

    fetchDatos();
  }, []);

  const handleSeleccionado = (genero: Genero) => {
    setGeneroSeleccionado((prevGeneroSeleccionado) =>
      prevGeneroSeleccionado === genero.id ? 0 : genero.id,
    );
  };

  const librosFiltrados = generoSeleccionado
    ? libros.filter((libro) => libro.categoria?.id === generoSeleccionado)
    : libros;

  return (
    <section>
      <h1 className="text-5xl text-primary m-4 font-bold">
        Bienvenido de vuelta,
        {usuario && (
          <span className="italic tracking-wider text-accent"> {usuario.nombre.toUpperCase()}</span>
        )}
        !
      </h1>

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
          <h4 className="text-lg font-bold mx-4">Filtrar por género:</h4>
          <div className="flex flex-wrap gap-2 p-4">
            {generos.length > 0 ? (
              generos.map((genero) => (
                <GeneroPill
                  key={genero.id}
                  genero={genero}
                  activo={generoSeleccionado === genero.id}
                  onClick={() => handleSeleccionado(genero)}
                />
              ))
            ) : (
              <p>Cargando géneros...</p>
            )}
          </div>

          <ul className="flex flex-col items-center md:flex-row md:flex-wrap justify-center">
            {librosFiltrados.map((libro) => (
              <div
                key={libro.id}
                onClick={() => navigate(`/libros/${libro.id}`)}
                className="cursor-pointer"
              >
                <BookCard libro={libro} />
              </div>
            ))}
          </ul>
        </div>
      ) : (
        <p>No hay libros en lectura.</p>
      )}
    </section>
  );
};

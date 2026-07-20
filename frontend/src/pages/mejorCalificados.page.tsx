import { useState, useEffect } from "react";
import { obtenerLibrosMejorCalificados } from "../services/estadisticas.service";
import type { Libro } from "../types/Libro.type";
import { BookCard } from "../components/common/bookCard";
import { BotonAtras } from "../components/ui/Boton.atras";

export const MejorCalificadosPage = () => {
  const [libros, setLibros] = useState<Libro[]>([]);

  useEffect(() => {
    const fetchLibros = async () => {
      try {
        const data = await obtenerLibrosMejorCalificados();
        setLibros(data);
      } catch (error) {
        console.error("Error al obtener los libros mejor calificados:", error);
      }
    };

    fetchLibros();
  }, []);

  return (
    <section>
      <h1 className="text-5xl text-primary m-4 font-bold">Mejor Calificados</h1>
      <div className="mx-4">
        <BotonAtras />
      </div>
      {libros.length > 0 ? (
        <ul className="flex flex-col items-center md:flex-row md:flex-wrap justify-center">
          {libros.map((libro) => (
            <BookCard key={libro.id} libro={libro} />
          ))}
        </ul>
      ) : (
        <p>Cargando libros mejor calificados...</p>
      )}
    </section>
  );
};

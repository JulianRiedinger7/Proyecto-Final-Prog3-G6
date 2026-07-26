import { useState } from "react";
import { librosService } from "../../services/libro.service";
import type { Libro } from "../../types/Libro.type";
import CalificarEstrellas from "../CalificacionStars";

interface BookCardProps {
  libro: Libro;
}

export const BookCard = ({ libro }: BookCardProps) => {
  const [imgError, setImgError] = useState(false);
  const [imgInvalida, setImgInvalida] = useState(false);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    if (e.currentTarget.naturalWidth <= 1 || e.currentTarget.naturalHeight <= 1) {
      setImgInvalida(true);
    }
  };

  const mostrarPlaceholder = !libro.portada || imgError || imgInvalida;

  return (
    <div className="bg-secondary text-primary p-6 rounded-lg shadow-md m-4 w-64 font-semibold hover:bg-accent transition-colors duration-300 hover:text-secondary uppercase md:h-130 flex flex-col">
      <div className="relative mt-4">
        {mostrarPlaceholder ? (
          <img
            src="/book-cover-placeholder.png"
            alt={libro.titulo}
            className="w-full h-64 object-cover rounded-md md:h-72 md:object-contain"
          />
        ) : (
          <img
            src={librosService.obtenerPortadaUrl(libro.portada!)}
            alt={libro.titulo}
            className="w-full h-64 object-cover rounded-md md:h-72 md:object-contain"
            onError={() => setImgError(true)}
            onLoad={handleLoad}
          />
        )}
        <span className="absolute top-2 right-2 z-10 rounded-full bg-primary px-2 py-1 text-[10px] font-bold text-secondary">
          {libro.estado}
        </span>
      </div>
      <div className="mt-4 flex flex-1 flex-col">
        <h3 className="text-xs tracking-widest text-gray-500 italic">{libro.categoria?.nombre}</h3>
        <p className="text-lg mt-2 tracking-wide min-h-18">{libro.titulo}</p>
        <p className="text-sm mt-2 italic font-light">{libro.autor}</p>
        <CalificarEstrellas
          puntaje={libro.puntaje ? Number(libro.puntaje) : 0}
          onChange={() => {}}
        />
      </div>
    </div>
  );
};

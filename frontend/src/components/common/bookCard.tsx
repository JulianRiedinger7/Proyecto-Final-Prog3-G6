import { useState } from "react";
import type { Libro } from "../../types/Libro.type";
import { getPortadaUrl } from "../../utils/getPortada.util";

interface BookCardProps {
  libro: Libro;
}

export const BookCard = ({ libro }: BookCardProps) => {
  const [error, setError] = useState<boolean>(false);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.currentTarget;

    // Open Library nos devuelve 1x1 cuando no tiene imagen
    if (img.naturalWidth <= 1 || img.naturalHeight <= 1) {
      setError(true);
    }
  };

  return (
    <div className="bg-secondary text-primary  p-6 rounded-lg shadow-md m-4 w-64 font-semibold hover:bg-accent transition-colors duration-300 hover:text-secondary uppercase md:h-115">
      <div className="relative mt-4">
        <img
          src={error ? "/book-cover-placeholder.png" : getPortadaUrl(libro.portada, "M")}
          alt={libro.titulo}
          className="w-full h-64 object-cover rounded-md md:h-72 md:object-contain"
          onError={() => setError(true)}
          onLoad={handleLoad}
        />
        <span className="absolute top-2 right-2 z-10 rounded-full bg-primary px-2 py-1 text-[10px] font-bold text-secondary">
          {libro.estado}
        </span>
      </div>
      <h3 className="text-xs mt-4 tracking-widest text-gray-500">{libro.categoria?.nombre}</h3>
      <p className="text-xl mt-5 tracking-wide">{libro.titulo}</p>
      <p className="text-sm mt-2 ">{libro.autor}</p>
      <span className="text-lg font-bold">{libro.puntaje}</span>
    </div>
  );
};

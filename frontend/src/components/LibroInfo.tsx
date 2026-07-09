import { useEffect, useState } from "react";
import { obtenerLibro }  from "../services/detalleLibroService";
import { Libro } from "../services/detalleLibroService";

interface LibroInfoProps {
  libro: Libro;
}

export default function LibroInfo({ libro }: LibroInfoProps) {
  return (
    <div className="flex gap-4">
      <img 
        src={libro.portada} 
        alt={`Portada de ${libro.titulo}`} 
        className="w-32 h-48 object-cover rounded"
      />

      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{libro.titulo}</h1>
        <p className="text-gray-600">{libro.autor}</p>

        <div className="flex gap-2">
          <span className="badge">{libro.generoId}</span>
          <span className="badge">{libro.estado}</span>
        </div>
      </div>
    </div>
  );
}
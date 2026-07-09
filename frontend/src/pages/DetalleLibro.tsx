import { useEffect, useState } from "react";

const [libros, setLibros] = useState([]);

useEffect(() => {
  const cargarLibros = async () => {
    const respuesta = await fetch("http://localhost:3000/api/libros");
    const datos = await respuesta.json();
    setLibros(datos);
  };

  cargarLibros();
}, []);

export default function PuntuacionStars() {
  const [rating, setRating] = useState(4);

  return (
    <div className="flex items-center gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => setRating(star)}
          className="cursor-pointer"
        >
          <span
            className={`material-symbols-rounded text-3xl ${
              star <= rating ? "text-yellow-400" : "text-[#dcc497]"
            }`}
            style={{
              fontVariationSettings: `'FILL' ${star <= rating ? 1 : 0}`,
            }}
          >
            star
          </span>
        </button>
      ))}

      <span className="ml-2 text-lg">
        {rating.toFixed(1)} / 5.0
      </span>
    </div>
  );
}



"use client";

import { useState } from "react";

interface ResenaFormProps {
  libroId: number;
  reseniaInicial?: string;
}

export default function ResenaForm({
  libroId,
  reseniaInicial = "",
}: ResenaFormProps) {
  const [resenia, setResenia] = useState(reseniaInicial);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const guardarResenia = async () => {
    try {
      setGuardando(true);
      setMensaje("");

      const response = await fetch(
        `http://localhost:3000/api/libros/${libroId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({resenia,}),
        }
      );

      if (!response.ok) {
        throw new Error("No se pudo guardar la reseña");
      }

      setMensaje("Reseña guardada correctamente");
    } catch (error) {
      console.error(error);
      setMensaje("Ocurrió un error al guardar");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div>
      <textarea
        value={resenia}
        onChange={(e) => setResenia(e.target.value)}
        rows={6}
        placeholder="Escribí tu reseña..."
      />

      <button onClick={guardarResenia} disabled={guardando}>
        {guardando ? "Guardando..." : "Guardar reseña"}
      </button>

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}
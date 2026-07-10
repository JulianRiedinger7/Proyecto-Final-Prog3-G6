import { useState } from "react";

interface CalificacionProps {
  libroId: number;
  PuntajeInicial?: number;
}

export default function CalificarEstrellas({libroId, PuntajeInicial = 0,}: CalificacionProps) 
{
  const [puntaje, setStars] = useState(PuntajeInicial);
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const guardarCalificacionStars = async () => {
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
          body: JSON.stringify({puntaje,}),
        }
      );

      if (!response.ok) {
        throw new Error("No se pudo guardar la calificación");
      }

      setMensaje("Calificación guardada correctamente");
    } catch (error) {
      console.error(error);
      setMensaje("Ocurrió un error al guardar");
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div>
      <div>
    {[1, 2, 3, 4, 5].map((estrella) => (
    <button
      key={estrella}
      type="button"
      onClick={() => setStars(estrella)}
      style={{
        background: "none",
        border: "none",
        cursor: "pointer",
        fontSize: "2rem",
        color: estrella <= puntaje ? "gold" : "lightgray",
      }}
    >
      ★
    </button>
     ))}
    </div>

      <button onClick={guardarCalificacionStars} disabled={guardando}>
        {guardando ? "Guardando..." : "Guardar calificación"}
      </button>

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}
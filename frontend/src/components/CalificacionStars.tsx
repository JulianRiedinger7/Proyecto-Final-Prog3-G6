interface CalificacionProps {
  puntaje: number;
  onChange: (puntaje: number) => void;
}

export default function CalificarEstrellas({ puntaje, onChange }: CalificacionProps) {
  return (
    <div>
      {[1, 2, 3, 4, 5].map((estrella) => (
        <button
          key={estrella}
          type="button"
          onClick={() => onChange(estrella)}
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
  );
}
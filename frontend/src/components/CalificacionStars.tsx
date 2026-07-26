interface CalificacionProps {
  puntaje: number;
  onChange: (puntaje: number) => void;
}

export default function CalificarEstrellas({ puntaje, onChange }: CalificacionProps) {
  return (
    <div className="flex gap-2">
      {[1, 2, 3, 4, 5].map((estrella) => (
        <button
          key={estrella}
          type="button"
          onClick={() => onChange(estrella)}
          className={`text-3xl transition-colors ${estrella <= puntaje ? "text-accent" : "text-gray-300"}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
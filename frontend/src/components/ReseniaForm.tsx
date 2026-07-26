interface ResenaFormProps {
  resenia: string;
  onChange: (resenia: string) => void;
}

export default function ReseniaForm({ resenia, onChange }: ResenaFormProps) {
  return (
    <textarea
      value={resenia}
      onChange={(e) => onChange(e.target.value)}
      rows={6}
      placeholder="Escribí tu reseña..."
      className="min-h-[140px] px-3 py-2 rounded-lg border border-border bg-secondary text-text text-sm focus:outline-none focus:ring-2 focus:ring-primary"
    />
  );
}
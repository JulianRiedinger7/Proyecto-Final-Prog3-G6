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
    />
  );
}
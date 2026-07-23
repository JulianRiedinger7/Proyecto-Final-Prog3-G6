import type { Genero } from "../../types/Genero.type";

interface GeneroPillProps {
  genero: Genero;
  activo: boolean;
  onClick: () => void;
}

export const GeneroPill = ({ genero, activo, onClick }: GeneroPillProps) => {
  return (
    <button
      className={`cursor-pointer rounded-full px-4 py-2 m-2 text-sm font-semibold transition-colors duration-300 ${
        activo ? "bg-primary text-secondary" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
      }`}
      onClick={onClick}
    >
      {genero.nombre}
    </button>
  );
};

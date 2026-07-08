import { type Genero } from "../../types/Genero.type";

interface BotonGenericoProps {
    faLabel: string;
    texto: string;
    genero: Genero;
    onClick: (genero:Genero) => void;
}

export function BotonGenerico({faLabel, texto, genero, onClick}: BotonGenericoProps) {
    return (
        <button className="w-30 h-10 rounded-xl bg-primary text-primary hover:bg-primary-hover cursor-pointer" onClick={() => onClick(genero)}>
            <span className={`fa-solid ${faLabel} text-blanco text-sm`}></span>
            <span className="ml-2 p-1 text-blanco">{texto}</span>
        </button>
    );
}
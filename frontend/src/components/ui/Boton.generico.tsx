interface BotonGenericoProps {
    faLabel: string;
    texto: string;
    onClick: () => void;    
}

export function BotonGenerico({faLabel, texto, onClick}: BotonGenericoProps) {
    return (
        <button className=" transition-transform duration-500 hover:scale-105 w-30 h-10 rounded-xl bg-primary text-primary hover:bg-primary-hover cursor-pointer" onClick={onClick}>
            <span className={`fa-solid ${faLabel} text-blanco text-sm`}></span>
            <span className="ml-2 p-1 text-blanco">{texto}</span>
        </button>
    );
}
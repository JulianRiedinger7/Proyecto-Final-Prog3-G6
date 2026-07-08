interface BotonAtrasProps {
    onClick: () => void;
}

export function BotonAtras ({onClick}:BotonAtrasProps) {
    return (
        <button className="cursor-pointer" onClick={() => onClick()}>
            <span className={`fa-solid fa-arrow-left text-blanco text-sm`}></span>
        </button>
    );
}
interface BotonListaProps {
    faLabel: string;
    onClick: () => void;
}

export function BotonLista ({faLabel, onClick}:BotonListaProps) {
    return (<button type="button" className="p-2 hover:text-blanco rounded-full cursor-pointer" onClick={onClick}>
                <i className={`fa-solid ${faLabel} text-[16px]`}></i>
            </button>);
}
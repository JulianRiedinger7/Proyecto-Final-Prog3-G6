import { useEffect, useRef } from "react";
import { BotonGenerico } from "../ui/Boton.generico";

interface ErrorMensajeProps {
    mensaje:string;
    onClose: (elementoConFoco: Element | null) => void;
}

export function ErrorMensaje({mensaje, onClose}:ErrorMensajeProps) {
    const refElemento = useRef<HTMLDivElement>(null);

    useEffect( () => {
        if (refElemento.current) {
            refElemento.current.focus();
        }
    },[])
    return (
        <div className="overlay flex items-center fixed top-0 left-0 w-full h-full bg-black/50">
            <div className="bg-blanco p-20 border-r-8" ref={refElemento} tabIndex={-1}>
                <h3 className="font-extrabold text-2xl">Error</h3>
                <p>{mensaje}</p>
                <BotonGenerico faLabel="fa-times-circle " texto="Cerrar" onClick={() => onClose(refElemento.current)}/>
            </div>
        </div>
    );
}
import { useEffect, useRef } from "react";
import { BotonGenerico } from "../ui/Boton.generico";

interface ErrorMensajeProps {
    mensaje:string;
    onClose: (elementoConFoco: HTMLDivElement | null) => void;
}

export function ErrorMensaje({mensaje, onClose}:ErrorMensajeProps) {
    const refElemento = useRef<HTMLDivElement>(null);

    useEffect( () => {
        if (refElemento.current) {
            refElemento.current.focus();
        }
    },[])
    return (
        <div className="overlay flex z-50 justify-center items-center fixed right-0 bottom-0 w-full h-full bg-black/50">
            <div className="flex flex-col items-start border-l-8 border-red-500 shadow-2xl shadow-amber-50">
                <div className="flex w-full m-0.5 bg-blanco" ref={refElemento} tabIndex={-1}>                 
                    <div className="bg-primary w-20">                        
                         <h3 className=" ml-0.5 font-extrabold text-xl text-blanco">Error</h3>
                    </div>
                    <div className="w-full">                   
                        <p className="p-10">{mensaje}</p>
                        <div className="flex justify-end pb-4 pr-4 mt-auto">
                            <BotonGenerico faLabel="fa-times-circle " texto="Cerrar" onClick={() => onClose(refElemento.current)}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
import { BotonGenerico } from "../ui/Boton.generico";

interface GeneroAgregarProps {
    genero:string;
    onClick: (genero:string) => void; 
}

export function GeneroAgregar ({genero, onClick}:GeneroAgregarProps) {
    return (
        <div className="flex flex-col bg-amber-400 rounded-xl h-36 w-min items-center">
            <div className="flex-1 w-full text-left pl-4 pt-4">
                <h1 className="font-extrabold text-xl">Añadir Nuevo Genero</h1>
            </div>
            <div className="flex-2">
                <div className="flex items-center-safe ml-2 mr-2">
                    <input className="bg-secondary rounded-sm m-1 h-12 w-3xl" type="text"/>
                    <BotonGenerico faLabel="fa-plus-circle" texto='Agregar' genero={{ id: 0, nombre: genero }} onClick={() => onClick(genero)} />
                </div>
            </div>
        </div>
    );
}
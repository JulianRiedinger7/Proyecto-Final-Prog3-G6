import { useEffect, useState } from "react";
import { type Genero } from "../types/Genero.type";
import { GeneroAgregar } from "../components/common/Genero.agregar";
import { GeneroLista } from "../components/common/Genero.lista";
import { GeneroTitulo } from "../components/common/Genero.titulo";
import { generoService } from "../services/generoService";



export function GestionGenero () {
    const [generos, setGeneros] = useState<Genero[]>([]);

    
    useEffect(() => {
        const cargarGeneros = async (): Promise<void> => {
            const datos = await generoService.obtenerGeneros();
            setGeneros(datos);
        };

        void cargarGeneros();
    }, []);

    return (
        <div className="flex flex-col w-min gap-10 bg-secondary">
            <div>
                <GeneroTitulo/>
            </div>
            <div>
                <GeneroAgregar onClick={()=>{}} genero=""/>
            </div>
            <div>
                <GeneroLista generos={generos} onBorrar={()=>{}} onEditar={() => {}}/>
            </div>
        </div>
    );
}
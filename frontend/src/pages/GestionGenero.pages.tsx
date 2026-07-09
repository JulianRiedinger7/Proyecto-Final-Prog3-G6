import { useEffect, useRef, useState } from "react";
import { type Genero } from "../types/Genero.type";
import { GeneroAgregar } from "../components/common/Genero.agregar";
import { GeneroLista } from "../components/common/Genero.lista";
import { GeneroTitulo } from "../components/common/Genero.titulo";
import { generoService } from "../services/genero.service";
import type { TipoRespuesta } from "../types/Respuesta.type";
import { ErrorMensaje } from "../components/common/Error.mensaje";



export function GestionGenero () {
    const [generos, setGeneros] = useState<Genero[]>([]);
    const [errorMensaje, setErrorMensaje] = useState<string | null>(null);
    const elementoOrigenRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        const cargarGeneros = async (): Promise<void> => {
            const datos = await generoService.obtenerGeneros();
            setGeneros(datos);
        };

        void cargarGeneros();
    }, []);

    const manejadorBorrar = async (id:number) => {
        try {
            await generoService.borrarGenero(id);
            setGeneros((generosAnteriores) =>
            generosAnteriores.filter((genero) => genero.id != id));
        } catch (error) {
            console.error("Error al borrar el género:", error);
        }
    }

    const manejadorEditar = async (id:number, nombre: string) => {
        try {
            const respuesta: TipoRespuesta = await generoService.editarGenero(id, nombre);
            if (respuesta.codigo !== 200) {
                elementoOrigenRef.current = document.activeElement as HTMLDivElement;
                setErrorMensaje(respuesta.mensaje);
                return;
            }
            setErrorMensaje(null);
            setGeneros((generosAnteriores) =>
                generosAnteriores.map((genero) => 
                    genero.id === id ? { ...genero, nombre: nombre } : genero));
        } catch (error) {
            console.error("Error al editar el género:", error);
            setErrorMensaje("Error al editar el género.");
        }
    }

    const manejadorCerrarError = () => {
        setErrorMensaje(null);
    }

    return (
        <div className="flex flex-col w-min gap-10 bg-secondary">
            <div>
                <GeneroTitulo/>
            </div>
            <div>
                <GeneroAgregar onClick={()=>{}} genero=""/>
            </div>
            <div>
                <GeneroLista generos={generos} onBorrar={manejadorBorrar} onEditar={manejadorEditar}/>
            </div>
            {errorMensaje && (
                <div>
                    <ErrorMensaje mensaje={errorMensaje} onClose={manejadorCerrarError}/>
                </div>
            )}
        </div>
    );
}
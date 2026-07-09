import { type Genero } from "../types/Genero.type";
import type { TipoRespuesta } from "../types/Respuesta.type";

const API_URL:string = "http://localhost:3001/api";


export class generoService  {
    public static obtenerGeneros = async ():Promise<Genero[]> => {
        try {
            const respuesta: Response = await fetch(`${API_URL}/categorias`);
            if (!respuesta.ok) {
                throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
            }
            const generos: Genero[] = await respuesta.json();
            return generos;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    public static borrarGenero = async (id:number):Promise<void> => {
        try {
            const respuesta: Response = await fetch(`${API_URL}/categorias/${id}`, {method:'DELETE'});
            if (!respuesta.ok) {
                throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
            }
        } catch (error) {
            console.error(error);
        }
    }

    public static editarGenero = async (id:number, nombre:string):Promise<TipoRespuesta> => {
        let resultado: TipoRespuesta = {codigo:500, mensaje: "Error Inexpecifico"};
        let respuesta: Response | undefined;

        try {
            respuesta = await fetch(`${API_URL}/categorias/${id}`,{
                                            method: 'PUT',
                                            headers: {
                                            'Content-Type': 'application/json',
                                            },
                                            body: JSON.stringify({nombre}),
                                        });
            if (!respuesta.ok) {
                resultado.codigo = respuesta.status;
                resultado.mensaje = respuesta.statusText;
                throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
            }
            resultado.codigo = respuesta.status;
            resultado.mensaje = respuesta.statusText;
        } catch (error) {
            resultado.codigo = respuesta?.status ?? 500;
            resultado.mensaje = respuesta?.statusText ?? (error instanceof Error ? error.message : 'Error Inexpecifico');
            console.error(error);
        }
        return resultado;
    }
}
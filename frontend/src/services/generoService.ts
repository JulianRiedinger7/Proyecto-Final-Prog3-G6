import { type Genero } from "../types/Genero.type";

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
}
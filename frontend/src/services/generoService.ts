import { type Genero } from "../types/Genero.type";

const API_URL:string = "http://localhost:3001/api";


export class generoService  {
    public static obtenerGeneros = async ():Promise<Genero[]> => {
        try {
            const respuesta = await fetch(`${API_URL}/categorias`);
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
}
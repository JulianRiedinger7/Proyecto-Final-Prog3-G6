import api from "./api";
import { type Genero } from "../types/Genero.type";
import type { TipoRespuesta } from "../types/Respuesta.type";

export class generoService {
    public static obtenerGeneros = async (): Promise<Genero[]> => {
        try {
            const respuesta = await api.get<Genero[]>("/categorias");
            return respuesta.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    public static borrarGenero = async (id: number): Promise<void> => {
        try {
            await api.delete(`/categorias/${id}`);
        } catch (error) {
            console.error(error);
        }
    };

    public static editarGenero = async (id: number, nombre: string): Promise<TipoRespuesta> => {
        let resultado: TipoRespuesta = { codigo: 500, mensaje: "Error Inexpecifico" };

        try {
            const respuesta = await api.put(`/categorias/${id}`, { nombre });
            resultado.codigo = respuesta.status;
            resultado.mensaje = respuesta.statusText;
        } catch (error) {
            resultado.codigo = 500;
            resultado.mensaje = error instanceof Error ? error.message : "Error Inexpecifico";
            console.error(error);
        }
        return resultado;
    };

    public static agregarGenero = async (nombre: string): Promise<TipoRespuesta> => {
        let resultado: TipoRespuesta = { codigo: 500, mensaje: "Error Inexpecifico" };
        let generos: Genero[] = [];
        let error: Error;

        try {
            if (!nombre.trim()) {
                error = new Error("Genero a agregar vacio");
                error.name = "400";
                throw error;
            }

            const respuesta = await api.get<Genero[]>("/categorias");
            generos = respuesta.data;

            for (const genero of generos) {
                if (genero.nombre.toUpperCase().trim() === nombre.toUpperCase().trim()) {
                    error = new Error(`Genero ${nombre} existente en la base con id #${genero.id}`);
                    error.name = "400";
                    throw error;
                }
            }

            const respuestaCreacion = await api.post("/categorias", { nombre });
            resultado.codigo = respuestaCreacion.status;
            resultado.objeto = respuestaCreacion.data;
            resultado.mensaje = "OK";
        } catch (error) {
            resultado.codigo = error instanceof Error ? Number(error.name) || 500 : 500;
            resultado.mensaje = error instanceof Error ? error.message : "Error Inexpecifico";
        }
        return resultado;
    };
}
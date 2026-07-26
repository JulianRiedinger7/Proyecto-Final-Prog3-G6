import api from "../services/api";
import type { AxiosResponse } from "axios";
import { type Genero } from "../types/Genero.type";
import type { TipoRespuesta } from "../types/Respuesta.type";

export class generoService  {
    public static obtenerGeneros = async ():Promise<Genero[]> => {
        try {
            const respuesta: AxiosResponse<Genero[]> = await api.get<Genero[]>('/categorias');            
            if (respuesta.status < 200 || respuesta.status >= 300) {
                throw new Error(`Error ${respuesta.status}: ${respuesta.statusText || respuesta.status}`);
            }
            return respuesta.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    public static borrarGenero = async (id:number):Promise<void> => {
        try {
            const respuesta: AxiosResponse = await api.delete(`/categorias/${id}`);
            if (respuesta.status < 200 || respuesta.status >= 300) {
                throw new Error(`Error ${respuesta.status}: ${respuesta.statusText}`);
            }
        } catch (error) {
            console.error(error);
        }
    }

    public static editarGenero = async (id:number, nombre:string):Promise<TipoRespuesta> => {
        let resultado: TipoRespuesta = {codigo:500, mensaje: "Error Inexpecifico"};
        let respuesta: AxiosResponse | undefined;

        try {
            respuesta = await api.put(`/categorias/${id}`, { nombre });
            if (!respuesta || respuesta.status < 200 || respuesta.status >= 300) {
                resultado.codigo = respuesta?.status ?? 500;
                resultado.mensaje = respuesta?.statusText ?? 'Error indefinido';
                throw new Error(`Error ${resultado.codigo}: ${resultado.mensaje}`);
            }
            resultado.codigo = respuesta.status;
            resultado.mensaje = respuesta.statusText || 'OK';
        } catch (error) {
            resultado.codigo = respuesta?.status ?? 500;
            resultado.mensaje = respuesta?.statusText ?? (error instanceof Error ? error.message : 'Error Inexpecifico');
            console.error(error);
        }
        return resultado;
    }

    public static agregarGenero = async (nombre:string):Promise<TipoRespuesta> => {
        let resultado: TipoRespuesta = {codigo: 500, mensaje: "Error Inexpecifico"};
        let respuesta: AxiosResponse<Genero[]>;
        let generos:Genero[] = [];
        let error: Error;

        try {
            if (!nombre.trim()) {
                error = new Error(`Genero a agregar vacio`);
                error.name = "400";
                throw error;
            }
            respuesta = await api.get(`/categorias`);
            if (respuesta.status >= 200 && respuesta.status < 300 ) {
                generos = respuesta.data;
                for (const genero of generos) {
                    if (genero.nombre.toUpperCase().trim() === nombre.toUpperCase().trim()) {
                        error = new Error(`Genero ${nombre} existente en la base con id #${genero.id}`);
                        error.name = "400";
                        throw error;
                    }
                }
                respuesta = await api.post(`/categorias`, {nombre});
                if (respuesta.status != 201) {
                    error = new Error(`No se pudo crear el genero ${nombre}`);
                    error.name = '500';
                    throw error;
                }
                resultado.codigo = 201;
                resultado.objeto = await respuesta.data;
            }
        } catch (error) {
            resultado.codigo = error instanceof Error ? Number(error.name) || 500 : 500;
            resultado.mensaje = error instanceof Error ? error.message : "Error Inexpecifico";
        }
        return resultado;
    }
}
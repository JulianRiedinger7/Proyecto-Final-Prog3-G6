import { Request, Response } from 'express';
import { Libro } from '../models/Libro';


export class LibrosController {
    public getLibros = async (req: Request, res: Response): Promise<Response> => {
        let codigo: number;
        let salida: object;

        try {
            codigo = 200;
            salida = await Libro.traerTodos();
        } catch (error) {
            codigo = 404;
            salida = { msg: error };
        }
        return res.status(codigo).json(salida);
    }

    public getPorId = async (req: Request, res: Response): Promise<Response> => {
        let codigo: number;
        let salida: object | null;

        try {
            codigo = 200;
            salida = await Libro.encontrarPorId(Number(req.params.id));
            if (!salida) {
                throw Error;
            }
        } catch (error) {
            codigo = 404;
            salida = { msg: error };
        }

        return res.status(codigo).json(salida);
    }

    public postLibro = async (req: Request, res: Response): Promise<Response> => {
        let codigo: number;
        let salida: object;

        try {
            codigo = 201;
            salida = await Libro.crear(req.body);
        } catch (error) {
            codigo = 400;
            salida = { msg: error};
        }
        return res.status(codigo).json(salida);
    }

    public putLibro = async (req: Request, res: Response): Promise<Response> => {
        let codigo: number;
        let salida: object | null;

        try {
            codigo = 200;
            salida = await Libro.actualizarLibro(Number(req.params.id), req.body);
            if (!salida) {
                throw Error;
            }
        } catch (error) {
            codigo = 500;
            salida = {msg: error};
        }
        return res.status(codigo).json(salida);
    }

    public borrarLibro = async (req: Request, res: Response): Promise<Response> => {
        let codigo: number;
        let salida: object | null;

        try {
            codigo = 200;
            salida = await Libro.borrarPorId(Number(req.params.id));
            if (!salida) {
                throw Error;
            }
        } catch(error) {
            codigo = 500;
            salida = { msg: error };
        }
        return res.status(codigo).json(salida);
    }

    public getPortada = async (req:Request, res:Response): Promise<Response> => {
        let codigo: number;
        let salida: object | null;
        let portadaTemp: string | undefined;

        try {
            codigo = 200;
            portadaTemp = await Libro.getPortada(Number(req.params.id));
            if (portadaTemp) {                
                salida = { portada: `https://covers.openlibrary.org/b/olid/${portadaTemp}M.jpg` };
            } else {
                throw Error;
            }
        } catch (error) {
            codigo = 404;
            salida = { msg: error };
        }
        return res.status(codigo).json(salida);
    }
}
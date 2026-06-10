import { NextFunction, Request, Response } from 'express';
import { Libro } from '../models/Libro';


export class LibrosController {
    public getLibros = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        let codigo: number = 404;
        let salida: object [] = [{}];
        let error: Error;

        try {
            codigo = 200;
            salida = await Libro.traerTodos();
            if (!salida || salida.length === 0) {
                error = new Error('Ups! Parece que tenemos de todo menos libros :(');
                error.name = '404-Libros';
                throw error;
            }            
            return res.status(codigo).json(salida);
        } catch (error) {
            next(error);
        }
    }

    public getPorId = async (req: Request, res: Response, next: NextFunction): Promise<Response  | void> => {
        let codigo: number = 404;
        let salida: object | null = null;
        let error: Error;
 
        try {
            codigo = 200;
            salida = await Libro.encontrarPorId(Number(req.params.id));
            if (!salida || salida === null) {
                error = new Error (`El ID#${req.params.id} no existe`);
                error.name = '404-IdLibro';
                throw error;
            }
            return res.status(codigo).json(salida);
        } catch (error) {
            next(error);
        }
    }

    public postLibro = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        let codigo: number = 400;
        let salida: object = {};

        try {
            codigo = 201;
            salida = await Libro.crear(req.body);
            return res.status(codigo).json(salida);
        } catch (error) {
            next(error);
        }        
    }

    public putLibro = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        let codigo: number = 400;
        let salida: object | null = {};

        try {
            codigo = 200;
            salida = await Libro.actualizarLibro(Number(req.params.id), req.body);
            return res.status(codigo).json(salida);
        } catch (error) {
            next(error);
        }        
    }

    public borrarLibro = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        let codigo: number = 500;
        let salida: object | null = null;

        try {
            codigo = 200;
            salida = await Libro.borrarPorId(Number(req.params.id));            
            return res.status(codigo).json(salida);
        } catch(error) {
            next(error)
        }        
    }

    public getPortada = async (req:Request, res:Response, next: NextFunction): Promise<Response | void> => {
        let codigo: number = 404;
        let salida: object | null = null;
        let portadaTemp: string | undefined;
        let error: Error;

        try {
            codigo = 200;
            portadaTemp = await Libro.getPortada(Number(req.params.id));
            if (portadaTemp) {                
                salida = { portada: `https://covers.openlibrary.org/b/olid/${portadaTemp}M.jpg` };
            } else {
                error = new Error('Lo siento mucho... No tenemos una portada para mostrarte');
                error.name = '404-Portada';
                throw error;
            }
            return res.status(codigo).json(salida);
        } catch (error) {
            next(error);
        }        
    }
}
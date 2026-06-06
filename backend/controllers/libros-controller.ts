import { Request, Response } from 'express';
import { Libro } from '../models/Libro';
import { InterfaceLibro } from '../interfaces/Libro-interface';

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
}
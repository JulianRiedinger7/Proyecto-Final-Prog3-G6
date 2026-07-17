import { Request, Response, NextFunction} from 'express';
import { Libro } from '../models/libro.model';
import { EstadoLectura, InterfaceLibro, type IActualizarEstado } from '../interfaces/Libro.interface';

export class EstadoLibroController {

    public obtenerLeidos = async (req: Request, res: Response, next: NextFunction) : Promise <Response |void> => {
        try { //busco en bd libros con estado "leido"
            const libros = await Libro.traerPorEstado(EstadoLectura.Leido, req.user?.id);
            res.json(libros); //devuelvo array de libros
        } catch (error) {
            next(error);
        }
    };

    public obtenerLeyendo = async (req: Request, res: Response, next: NextFunction) : Promise <Response |void> => {
        try {//busco en bd libros con estado "leyendo"
            const libros = await Libro.traerPorEstado(EstadoLectura.Leyendo, req.user?.id);
            res.json(libros); //devuelvo array de libros
        } catch (error) {
            next(error);
        }
    };

    public obtenerPorLeer = async (req: Request, res: Response, next: NextFunction) : Promise <Response |void> => {
        try {//busco en bd libros con estado "por leer"
            const libros = await Libro.traerPorEstado(EstadoLectura.PorLeer, req.user?.id);
            
            res.json(libros); //devuelvo array de libros
        } catch (error) {
            next(error);
        }
    };

    public actualizarEstado = async (req: Request, res: Response, next: NextFunction) : Promise <Response |void> => {
        try {
            // valido ID
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                throw Error('ID inválido');
            }

            // Leo estado del body
            const { estado } = req.body as IActualizarEstado;

            // valido que estado sea enum
            const estadosValidos = Object.values(EstadoLectura);
            if (!estado || !estadosValidos.includes(estado)) {
                throw Error(`Estado inválido. Debe ser uno de: ${estadosValidos.join(', ')}`);
            }

            const libro : InterfaceLibro | null = await Libro.actualizarLibro(id, { estado });
            if (!libro) {
                const error = new Error('Libro no encontrado');
                error.name = '404-Libros';
                return next(error);
            }

            res.json(libro);

        } catch (error) {
            next(error);
        }
    };
}
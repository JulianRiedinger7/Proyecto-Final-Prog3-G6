import { Request, Response } from 'express';
import { Libro } from '../models/libro.model';
import { EstadoLectura, type IActualizarEstado } from '../interfaces/Libro.interface';

export class EstadoLibroController {

    public obtenerLeidos = async (req: Request, res: Response) => {
        try { //busco en bd libros con estado "leido"
            const libros = await Libro.findAll({
                where: { estado: EstadoLectura.Leido }
            });
            res.json(libros); //devuelvo array de libros
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    };

    public obtenerLeyendo = async (req: Request, res: Response) => {
        try {//busco en bd libros con estado "leyendo"
            const libros = await Libro.findAll({
                where: { estado: EstadoLectura.Leyendo }
            });
            res.json(libros); //devuelvo array de libros
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    };

    public obtenerPorLeer = async (req: Request, res: Response) => {
        try {//busco en bd libros con estado "por leer"
            const libros = await Libro.findAll({
                where: { estado: EstadoLectura.PorLeer }
            });
            res.json(libros); //devuelvo array de libros
        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    };

    public actualizarEstado = async (req: Request, res: Response) => {
        try {
            // valido ID
            const id = parseInt(req.params.id, 10);
            if (isNaN(id)) {
                return res.status(400).json({ error: 'ID inválido' });
            }

            // Leo estado del body
            const { estado } = req.body as IActualizarEstado;

            // valido que estado sea enum
            const estadosValidos = Object.values(EstadoLectura);
            if (!estado || !estadosValidos.includes(estado)) {
                return res.status(400).json({
                    error: `Estado inválido. Debe ser uno de: ${estadosValidos.join(', ')}`
                });
            }

            // busco libro por ID
            const libro = await Libro.findByPk(id);
            if (!libro) {
                return res.status(404).json({ error: 'Libro no encontrado' });
            }

            // actualizo estado
            await libro.update({ estado });
            res.json(libro);

        } catch (error) {
            res.status(500).json({ error: 'Error interno del servidor' });
        }
    };
}
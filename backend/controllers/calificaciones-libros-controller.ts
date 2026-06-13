import { NextFunction, Request, Response } from 'express';
import { Libro } from '../models/Libro';
const { Op } = require('sequelize');

export class CalificacionController {
  public actualizarCalificacion = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id =parseInt(req.params.id);
      const puntaje = parseFloat(req.body.puntaje);

      if (isNaN(puntaje) || puntaje < 1 || puntaje > 5) {
        return res.status(400).json({ error: 'El puntaje debe ser un número entre 1 y 5.' });
        return;
      }
      const libro = await Libro.findByPk(id);
      if (!libro) {
        const error = new Error('Libro no encontrado');
        error.name = '404-Libros';
        return next(error);
      }

      await libro.update({ puntaje });
      res.json({ message: 'Calificación actualizada correctamente', libro });
    } catch (error) {
      next(error);
    }
  };


  public getMejorCalificados = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const libros = await Libro.findAll({
        where: { puntaje: {[Op.not]: null} },
        order: [['puntaje', 'DESC']],
      });
      res.json(libros);
    } catch (error) {
      next(error);
    }
  };
}
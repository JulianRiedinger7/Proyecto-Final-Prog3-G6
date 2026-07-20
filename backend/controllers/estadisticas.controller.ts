import { Response, Request, NextFunction } from "express";
import { Estadisticas } from "../utils/estadisticas.util";

export class EstadisticasController {
  public getEstadisticas = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    let codigo: number;
    let salida: object;
    try {
      codigo = 200;
      salida = await Estadisticas.obtenerEstadisticas(req.user?.id as number);
      return res.status(codigo).json(salida);
    } catch (error) {
      next(error);
    }
  };
}
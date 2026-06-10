import { Categoria } from "../models/categoria.model";
import { ICategoria } from "../interfaces/categoria.interface";
import { Request, Response, NextFunction } from "express";

export class CategoriasController {
  public getCategorias = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const categorias: ICategoria[] | [] = await Categoria.traerTodas();
      if (categorias.length === 0) {
        return res.status(404).json({ msg: "No se encontraron categorías" });
      }
      return res.status(200).json(categorias);
    } catch (error) {
      next(error);
    }
  };
}

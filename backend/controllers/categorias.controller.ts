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

  public getCategoriaById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { id } = req.params;
      const categoria: ICategoria | null = await Categoria.encontrarPorId(Number(id));
      if (!categoria) {
        return res.status(404).json({ msg: `No se encontró la categoría con ID ${id}` });
      }
      return res.status(200).json(categoria);
    } catch (error) {
      next(error);
    }
  };

  public postCategoria = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { nombre } = req.body;
      const nuevaCategoria: ICategoria = await Categoria.crear({ nombre });
      return res.status(201).json(nuevaCategoria);
    } catch (error) {
      next(error);
    }
  };

  public deleteCategoria = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response | void> => {
    try {
      const { id } = req.params;
      const categoriaEliminada: ICategoria | null = await Categoria.borrar(Number(id));
      if (!categoriaEliminada) {
        return res
          .status(404)
          .json({ msg: `No se encontró la categoría con ID ${id} para eliminar` });
      }
      return res.status(200).json({
        msg: `Categoría con ID ${id} eliminada exitosamente`,
        categoria: categoriaEliminada,
      });
    } catch (error) {
      next(error);
    }
  };
}

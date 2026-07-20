import { Request, Response, NextFunction } from "express";
import { CategoriasController } from "./categorias.controller";
import { Categoria } from "../models/categoria.model";

jest.mock("../models/categoria.model", () => ({
  Categoria: {
    traerTodas: jest.fn(),
    encontrarPorId: jest.fn(),
    crear: jest.fn(),
    borrar: jest.fn(),
    actualizarCategoria: jest.fn(),
  },
}));

describe("CategoriasController", () => {
  const controller = new CategoriasController();
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  it("getCategorias devuelve las categorías cuando existen", async () => {
    const categorias = [{ id: 1, nombre: "Fantasía" }];
    (Categoria.traerTodas as jest.Mock).mockResolvedValue(categorias);

    await controller.getCategorias(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(categorias);
    expect(next).not.toHaveBeenCalled();
  });

  it("getCategorias pasa el error cuando no hay categorías", async () => {
    (Categoria.traerTodas as jest.Mock).mockResolvedValue([]);

    await controller.getCategorias(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
    const error = (next as jest.Mock).mock.calls[0][0] as Error;
    expect(error.message).toBe("No hay categorías registradas");
    expect(error.name).toBe("404-Categorias");
  });

  it("getCategoriaById devuelve la categoría cuando existe", async () => {
    req.params = { id: "1" };
    const categoria = { id: 1, nombre: "Fantasía" };
    (Categoria.encontrarPorId as jest.Mock).mockResolvedValue(categoria);

    await controller.getCategoriaById(req as Request, res as Response, next);

    expect(Categoria.encontrarPorId).toHaveBeenCalledWith(1);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(categoria);
  });

  it("getCategoriaById pasa el error cuando no existe", async () => {
    req.params = { id: "99" };
    (Categoria.encontrarPorId as jest.Mock).mockResolvedValue(null);

    await controller.getCategoriaById(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
    const error = (next as jest.Mock).mock.calls[0][0] as Error;
    expect(error.message).toBe("No se encontró la categoría con ID 99");
    expect(error.name).toBe("404-IdCategoria");
  });

  it("postCategoria devuelve la categoría creada", async () => {
    req.body = { nombre: "Terror" };
    const nuevaCategoria = { id: 2, nombre: "Terror" };
    (Categoria.crear as jest.Mock).mockResolvedValue(nuevaCategoria);

    await controller.postCategoria(req as Request, res as Response, next);

    expect(Categoria.crear).toHaveBeenCalledWith({ nombre: "Terror" });
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(nuevaCategoria);
  });

  it("deleteCategoria devuelve la categoría eliminada", async () => {
    req.params = { id: "3" };
    const categoriaEliminada = { id: 3, nombre: "Drama" };
    (Categoria.borrar as jest.Mock).mockResolvedValue(categoriaEliminada);

    await controller.deleteCategoria(req as Request, res as Response, next);

    expect(Categoria.borrar).toHaveBeenCalledWith(3);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      msg: "Categoría con ID 3 eliminada exitosamente",
      categoria: categoriaEliminada,
    });
  });

  it("deleteCategoria pasa el error cuando no existe la categoría a eliminar", async () => {
    req.params = { id: "99" };
    (Categoria.borrar as jest.Mock).mockResolvedValue(null);

    await controller.deleteCategoria(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
    const error = (next as jest.Mock).mock.calls[0][0] as Error;
    expect(error.message).toBe("No se encontró la categoría con ID 99 para eliminar");
    expect(error.name).toBe("404-IdCategoria");
  });

  it("putCategoria devuelve la categoría actualizada", async () => {
    req.params = { id: "4" };
    req.body = { nombre: "Ciencia ficción" };
    const categoriaActualizada = { id: 4, nombre: "Ciencia ficción" };
    (Categoria.actualizarCategoria as jest.Mock).mockResolvedValue(categoriaActualizada);

    await controller.putCategoria(req as Request, res as Response, next);

    expect(Categoria.actualizarCategoria).toHaveBeenCalledWith(4, { nombre: "Ciencia ficción" });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(categoriaActualizada);
  });

  it("putCategoria pasa el error cuando no existe la categoría a actualizar", async () => {
    req.params = { id: "99" };
    req.body = { nombre: "No existe" };
    (Categoria.actualizarCategoria as jest.Mock).mockResolvedValue(null);

    await controller.putCategoria(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
    const error = (next as jest.Mock).mock.calls[0][0] as Error;
    expect(error.message).toBe("No se encontró la categoría con ID 99");
    expect(error.name).toBe("404-IdCategoria");
  });
});

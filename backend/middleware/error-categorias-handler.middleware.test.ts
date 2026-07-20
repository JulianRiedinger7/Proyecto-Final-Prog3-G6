import { Request, Response, NextFunction } from "express";
import { ErrorCategorias } from "./error-categorias-handler.middleware";

describe("ErrorCategorias middleware", () => {
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
  });

  it("devuelve 404 con el mensaje del error para errores de categorías", () => {
    const error = { name: "404-Categorias", message: "No hay categorías registradas" };

    ErrorCategorias.manejadorErrores(error as Error, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ error: "No hay categorías registradas" });
    expect(next).not.toHaveBeenCalled();
  });

  it("delegua al siguiente middleware cuando el error no es de categorías", () => {
    const error = { name: "500-Interno", message: "Error inesperado" };

    ErrorCategorias.manejadorErrores(error as Error, req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(error);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});

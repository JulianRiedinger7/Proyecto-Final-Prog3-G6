import { Request, Response, NextFunction } from "express";
import { ErrorAuth } from "./error-auth";

describe("ErrorAuth middleware", () => {
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

  it("devuelve 401 cuando el error es 401-TokenFaltante", () => {
    const error = { name: "401-TokenFaltante", message: "Token no proporcionado" };

    ErrorAuth.manejadorErrores(error as Error, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Token no proporcionado" });
    expect(next).not.toHaveBeenCalled();
  });

  it("devuelve 401 cuando el error es 401-TokenExpirado", () => {
    const error = { name: "401-TokenExpirado", message: "El token ha expirado" };

    ErrorAuth.manejadorErrores(error as Error, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "El token ha expirado" });
  });

  it("devuelve 401 cuando el error es 401-TokenInvalido", () => {
    const error = { name: "401-TokenInvalido", message: "Token inválido" };

    ErrorAuth.manejadorErrores(error as Error, req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: "Token inválido" });
  });

  it("delega al siguiente middleware cuando el error no es de auth", () => {
    const error = { name: "500-Interno", message: "Error inesperado" };

    ErrorAuth.manejadorErrores(error as Error, req as Request, res as Response, next);

    expect(next).toHaveBeenCalledWith(error);
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});
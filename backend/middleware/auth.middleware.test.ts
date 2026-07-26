import { Request, Response, NextFunction } from "express";
import { authMiddleware } from "./auth.middleware";
import jwt from "jsonwebtoken";

jest.mock("jsonwebtoken", () => ({
  verify: jest.fn(),
}));

describe("authMiddleware", () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = { headers: {} };
    res = {};
    next = jest.fn();
    jest.clearAllMocks();
    process.env.JWT_SECRET = "secreto-de-test";
  });

  it("llama a next() e inyecta req.user cuando el token es válido", () => {
    const payload = { id: 1, mail: "julieta@mail.com", nombre: "Julieta" };
    req.headers = { authorization: "Bearer token-valido" };
    (jwt.verify as jest.Mock).mockReturnValue(payload);

    authMiddleware(req as Request, res as Response, next);

    expect(jwt.verify).toHaveBeenCalledWith("token-valido", "secreto-de-test");
    expect(req.user).toEqual(payload);
    expect(next).toHaveBeenCalledWith(); // sin argumentos = sin error
  });

  it("pasa error 401-TokenFaltante cuando no hay header authorization", () => {
    req.headers = {};

    authMiddleware(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
    const error = (next as jest.Mock).mock.calls[0][0] as Error;
    expect(error.name).toBe("401-TokenFaltante");
    expect(error.message).toBe("Token no proporcionado");
    expect(jwt.verify).not.toHaveBeenCalled();
  });

  it("pasa error 401-TokenFaltante cuando el header no empieza con 'Bearer '", () => {
    req.headers = { authorization: "Token123" };

    authMiddleware(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
    const error = (next as jest.Mock).mock.calls[0][0] as Error;
    expect(error.name).toBe("401-TokenFaltante");
  });

  it("pasa error 401-TokenExpirado cuando jwt.verify lanza TokenExpiredError", () => {
    req.headers = { authorization: "Bearer token-vencido" };
    const errorExpirado = new Error("jwt expired");
    errorExpirado.name = "TokenExpiredError";
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw errorExpirado;
    });

    authMiddleware(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
    const error = (next as jest.Mock).mock.calls[0][0] as Error;
    expect(error.name).toBe("401-TokenExpirado");
    expect(error.message).toBe("El token ha expirado");
  });

  it("pasa error 401-TokenInvalido cuando jwt.verify lanza JsonWebTokenError", () => {
    req.headers = { authorization: "Bearer token-corrupto" };
    const errorInvalido = new Error("jwt malformed");
    errorInvalido.name = "JsonWebTokenError";
    (jwt.verify as jest.Mock).mockImplementation(() => {
      throw errorInvalido;
    });

    authMiddleware(req as Request, res as Response, next);

    expect(next).toHaveBeenCalled();
    const error = (next as jest.Mock).mock.calls[0][0] as Error;
    expect(error.name).toBe("401-TokenInvalido");
    expect(error.message).toBe("Token inválido");
  });
});
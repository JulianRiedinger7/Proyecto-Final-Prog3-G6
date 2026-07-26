import { NextFunction, Request, Response } from "express";
import { ErrorLibros } from "./error-libros-handler.middleware";

interface MockResponse {
  status: jest.Mock;
  json: jest.Mock;
}

const crearResponse = (): MockResponse => {
  const response = {} as MockResponse;
  response.status = jest.fn().mockReturnValue(response);
  response.json = jest.fn().mockReturnValue(response);
  return response;
};

const crearError = (nombre: string, mensaje: string): Error =>
  Object.assign(new Error(mensaje), { name: nombre });

describe("ErrorLibros.manejadorErrores", () => {
  let response: MockResponse;
  let next: jest.MockedFunction<NextFunction>;

  beforeEach(() => {
    response = crearResponse();
    next = jest.fn();
    jest.spyOn(console, "log").mockImplementation();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it.each([
    ["404-Libros", "No hay libros disponibles"],
    ["404-Portada", "No hay portada disponible"],
    ["404-IdLibro", "El libro no existe"],
  ])("responde 404 para el error %s", (nombre, mensaje) => {
    const error = crearError(nombre, mensaje);

    ErrorLibros.manejadorErrores(error, {} as Request, response as unknown as Response, next);

    expect(console.log).toHaveBeenCalledWith(`[SERVER ERROR] ${mensaje}`);
    expect(response.status).toHaveBeenCalledWith(404);
    expect(response.json).toHaveBeenCalledWith({ error: mensaje });
    expect(next).not.toHaveBeenCalled();
  });

  it("delega al siguiente middleware los errores no gestionados", () => {
    const error = crearError("500-BaseDeDatos", "No se pudo conectar a la base de datos");

    ErrorLibros.manejadorErrores(error, {} as Request, response as unknown as Response, next);

    expect(console.log).toHaveBeenCalledWith("[SERVER ERROR] No se pudo conectar a la base de datos");
    expect(response.status).not.toHaveBeenCalled();
    expect(response.json).not.toHaveBeenCalled();
    expect(next).toHaveBeenCalledWith(error);
  });
});

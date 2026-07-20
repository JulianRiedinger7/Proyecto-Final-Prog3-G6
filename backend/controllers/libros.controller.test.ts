import { NextFunction, Request, Response } from "express";
import { EstadoLectura, InterfaceLibro } from "../interfaces/Libro.interface";
import { Libro } from "../models/libro.model";
import { LibrosController } from "./libros.controller";

interface MockResponse {
  status: jest.Mock;
  json: jest.Mock;
}

const libro: InterfaceLibro = {
  id: 1,
  titulo: "Cien años de soledad",
  autor: "Gabriel García Márquez",
  anio: 1967,
  estado: EstadoLectura.Leido,
  usuarioId: 4,
};

const crearRequest = (overrides: Partial<Request> = {}): Request =>
  ({
    body: {},
    params: {},
    user: { id: 4, nombre: "Ada Lovelace", mail: "ada@example.com" },
    ...overrides,
  }) as Request;

const crearResponse = (): MockResponse => {
  const response = {} as MockResponse;
  response.status = jest.fn().mockReturnValue(response);
  response.json = jest.fn().mockReturnValue(response);
  return response;
};

describe("LibrosController", () => {
  const controller = new LibrosController();
  let response: MockResponse;
  let next: jest.MockedFunction<NextFunction>;

  beforeEach(() => {
    response = crearResponse();
    next = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("devuelve los libros del usuario autenticado", async () => {
    const traerTodos = jest.spyOn(Libro, "traerTodos").mockResolvedValue([libro]);

    await controller.getLibros(crearRequest(), response as unknown as Response, next);

    expect(traerTodos).toHaveBeenCalledWith(4);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith([libro]);
  });

  it("delegar el error cuando el usuario no posee libros", async () => {
    jest.spyOn(Libro, "traerTodos").mockResolvedValue([]);

    await controller.getLibros(crearRequest(), response as unknown as Response, next);

    expect(next).toHaveBeenCalledWith(expect.objectContaining({
      name: "404-Libros",
      message: "Ups! Parece que tenemos de todo menos libros :(",
    }));
    expect(response.status).not.toHaveBeenCalled();
  });

  it("obtiene un libro por su id", async () => {
    const encontrarPorId = jest.spyOn(Libro, "encontrarPorId").mockResolvedValue(libro);

    await controller.getPorId(crearRequest({ params: { id: "1" } }), response as unknown as Response, next);

    expect(encontrarPorId).toHaveBeenCalledWith(1);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith(libro);
  });

  it("delegar el error cuando el id solicitado no existe", async () => {
    jest.spyOn(Libro, "encontrarPorId").mockResolvedValue(null);

    await controller.getPorId(crearRequest({ params: { id: "99" } }), response as unknown as Response, next);

    expect(next).toHaveBeenCalledWith(expect.objectContaining({
      name: "404-IdLibro",
      message: "El ID#99 no existe",
    }));
  });

  it("crea un libro y asigna el usuario autenticado", async () => {
    const datosLibro = { ...libro, usuarioId: undefined };
    const crear = jest.spyOn(Libro, "crear").mockResolvedValue(libro);

    await controller.postLibro(
      crearRequest({ body: datosLibro }),
      response as unknown as Response,
      next,
    );

    expect(crear).toHaveBeenCalledWith({ ...datosLibro, usuarioId: 4 });
    expect(response.status).toHaveBeenCalledWith(201);
    expect(response.json).toHaveBeenCalledWith(libro);
  });

  it("actualiza un libro por su id", async () => {
    const cambios = { titulo: "El amor en los tiempos del cólera" };
    const actualizarLibro = jest.spyOn(Libro, "actualizarLibro").mockResolvedValue(libro);

    await controller.putLibro(
      crearRequest({ params: { id: "1" }, body: cambios }),
      response as unknown as Response,
      next,
    );

    expect(actualizarLibro).toHaveBeenCalledWith(1, cambios);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith(libro);
  });

  it("elimina un libro existente", async () => {
    const borrarPorId = jest.spyOn(Libro, "borrarPorId").mockResolvedValue(libro);

    await controller.borrarLibro(
      crearRequest({ params: { id: "1" } }),
      response as unknown as Response,
      next,
    );

    expect(borrarPorId).toHaveBeenCalledWith(1);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith(libro);
  });

  it("delegar el error cuando se intenta eliminar un libro inexistente", async () => {
    jest.spyOn(Libro, "borrarPorId").mockResolvedValue(null);

    await controller.borrarLibro(
      crearRequest({ params: { id: "99" } }),
      response as unknown as Response,
      next,
    );

    expect(next).toHaveBeenCalledWith(expect.objectContaining({
      name: "404-IdLibro",
      message: "El ID#99 no existe para eliminar",
    }));
  });

  it("construye la URL de la portada", async () => {
    const getPortada = jest.spyOn(Libro, "getPortada").mockResolvedValue("OL123M");

    await controller.getPortada(
      crearRequest({ params: { id: "1" } }),
      response as unknown as Response,
      next,
    );

    expect(getPortada).toHaveBeenCalledWith(1);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({
      portada: "https://covers.openlibrary.org/b/olid/OL123MM.jpg",
    });
  });

  it("delegar el error cuando el libro no tiene portada", async () => {
    jest.spyOn(Libro, "getPortada").mockResolvedValue(undefined);

    await controller.getPortada(
      crearRequest({ params: { id: "1" } }),
      response as unknown as Response,
      next,
    );

    expect(next).toHaveBeenCalledWith(expect.objectContaining({
      name: "404-Portada",
      message: "Lo siento mucho... No tenemos una portada para mostrarte",
    }));
  });

  it("actualiza la reseña de un libro", async () => {
    const cambios = { resenia: "Una obra imprescindible" };
    const actualizarResenia = jest.spyOn(Libro, "actualizarResenia").mockResolvedValue(libro);

    await controller.patchResenia(
      crearRequest({ params: { id: "1" }, body: cambios }),
      response as unknown as Response,
      next,
    );

    expect(actualizarResenia).toHaveBeenCalledWith(1, cambios);
    expect(response.status).toHaveBeenCalledWith(200);
    expect(response.json).toHaveBeenCalledWith({
      msg: "Reseña actualizada correctamente",
      libro,
    });
  });

  it("delegar el error cuando no se puede actualizar la reseña", async () => {
    jest.spyOn(Libro, "actualizarResenia").mockResolvedValue(null);

    await controller.patchResenia(
      crearRequest({ params: { id: "99" }, body: { resenia: "No existe" } }),
      response as unknown as Response,
      next,
    );

    expect(next).toHaveBeenCalledWith(Error);
  });
});

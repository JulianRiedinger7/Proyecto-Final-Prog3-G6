import { Request, Response, NextFunction } from "express";
import { CalificacionController } from "./calificaciones.libros.controller";
import { Libro } from "../models/libro.model";

jest.mock("../models/libro.model", () => ({
  Libro: {
    findByPk: jest.fn(),
    findAll: jest.fn(),
  },
}));

describe("CalificacionController", () => {
  const controller = new CalificacionController();
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = { params: {}, body: {} };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
    jest.clearAllMocks();
  });

  describe("actualizarCalificacion", () => {
    it("actualiza el puntaje y devuelve el libro cuando el valor es válido", async () => {
      req.params = { id: "1" };
      req.body = { puntaje: "4" };

      const libroFake = { id: 1, titulo: "Rayuela", puntaje: 4, update: jest.fn() };
      (Libro.findByPk as jest.Mock).mockResolvedValue(libroFake);

      await controller.actualizarCalificacion(req as Request, res as Response, next);

      expect(Libro.findByPk).toHaveBeenCalledWith(1);
      expect(libroFake.update).toHaveBeenCalledWith({ puntaje: 4 });
      expect(res.json).toHaveBeenCalledWith({
        message: "Calificación actualizada correctamente",
        libro: libroFake,
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("devuelve 400 cuando el puntaje no es un número", async () => {
      req.params = { id: "1" };
      req.body = { puntaje: "no-es-un-numero" };

      await controller.actualizarCalificacion(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "El puntaje debe ser un número entre 1 y 5.",
      });
      expect(Libro.findByPk).not.toHaveBeenCalled();
    });

    it("devuelve 400 cuando el puntaje es menor a 1", async () => {
      req.params = { id: "1" };
      req.body = { puntaje: "0" };

      await controller.actualizarCalificacion(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "El puntaje debe ser un número entre 1 y 5.",
      });
    });

    it("devuelve 400 cuando el puntaje es mayor a 5", async () => {
      req.params = { id: "1" };
      req.body = { puntaje: "6" };

      await controller.actualizarCalificacion(req as Request, res as Response, next);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "El puntaje debe ser un número entre 1 y 5.",
      });
    });

    it("pasa el error 404-Libros cuando el libro no existe", async () => {
      req.params = { id: "99" };
      req.body = { puntaje: "3" };
      (Libro.findByPk as jest.Mock).mockResolvedValue(null);

      await controller.actualizarCalificacion(req as Request, res as Response, next);

      expect(next).toHaveBeenCalled();
      const error = (next as jest.Mock).mock.calls[0][0] as Error;
      expect(error.message).toBe("Libro no encontrado");
      expect(error.name).toBe("404-Libros");
    });

    it("pasa el error al siguiente middleware cuando ocurre un error inesperado", async () => {
      req.params = { id: "1" };
      req.body = { puntaje: "4" };
      const errorInesperado = new Error("Fallo de conexión a la base");
      (Libro.findByPk as jest.Mock).mockRejectedValue(errorInesperado);

      await controller.actualizarCalificacion(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(errorInesperado);
    });
  });

  describe("getMejorCalificados", () => {
    it("devuelve los libros ordenados por puntaje descendente", async () => {
      const librosFake = [
        { id: 1, titulo: "Rayuela", puntaje: 5 },
        { id: 2, titulo: "El Aleph", puntaje: 4 },
      ];
      (Libro.findAll as jest.Mock).mockResolvedValue(librosFake);

      await controller.getMejorCalificados(req as Request, res as Response, next);

      expect(Libro.findAll).toHaveBeenCalledWith(
        expect.objectContaining({
          order: [["puntaje", "DESC"]],
        })
      );
      expect(res.json).toHaveBeenCalledWith(librosFake);
      expect(next).not.toHaveBeenCalled();
    });

    it("pasa el error al siguiente middleware cuando falla la consulta", async () => {
      const errorInesperado = new Error("Fallo de conexión a la base");
      (Libro.findAll as jest.Mock).mockRejectedValue(errorInesperado);

      await controller.getMejorCalificados(req as Request, res as Response, next);

      expect(next).toHaveBeenCalledWith(errorInesperado);
      expect(res.json).not.toHaveBeenCalled();
    });
  });
});
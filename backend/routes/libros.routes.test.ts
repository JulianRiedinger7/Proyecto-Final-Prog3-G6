import express from "express";
import request from "supertest";
import { LibrosRouter } from "./libros.routes";

const mockGetPortada = jest.fn();
const mockGetLibros = jest.fn();
const mockPatchResenia = jest.fn();
const mockGetPorId = jest.fn();
const mockPostLibro = jest.fn();
const mockPutLibro = jest.fn();
const mockBorrarLibro = jest.fn();

jest.mock("../middleware/auth.middleware", () => ({
  authMiddleware: jest.fn((req, _res, next) => {
    req.user = { id: 1, mail: "test@example.com", nombre: "Test" };
    next();
  }),
}));

jest.mock("../controllers/libros.controller", () => ({
  LibrosController: jest.fn().mockImplementation(() => ({
    getPortada: mockGetPortada,
    getLibros: mockGetLibros,
    patchResenia: mockPatchResenia,
    getPorId: mockGetPorId,
    postLibro: mockPostLibro,
    putLibro: mockPutLibro,
    borrarLibro: mockBorrarLibro,
  })),
}));

jest.mock("../controllers/estado.libro.controller", () => ({
  EstadoLibroController: jest.fn().mockImplementation(() => ({
    obtenerLeidos: jest.fn(),
    obtenerLeyendo: jest.fn(),
    obtenerPorLeer: jest.fn(),
    actualizarEstado: jest.fn(),
  })),
}));

jest.mock("../controllers/calificaciones.libros.controller", () => ({
  CalificacionController: jest.fn().mockImplementation(() => ({
    getMejorCalificados: jest.fn(),
    actualizarCalificacion: jest.fn(),
  })),
}));

describe("LibrosRouter - rutas de integración", () => {
  let app: express.Express;

  beforeEach(() => {
    jest.clearAllMocks();
    app = express();
    app.use(express.json());
    app.use("/libros", new LibrosRouter().getRouter());
  });

  it("delega GET /libros/portada/:id al controlador getPortada", async () => {
    mockGetPortada.mockImplementation((_req, res) => {
      res.status(200).json({ ok: true, source: "portada" });
    });

    const response = await request(app).get("/libros/portada/7");

    expect(response.status).toBe(200);
    expect(mockGetPortada).toHaveBeenCalledTimes(1);
    expect(response.body).toEqual({ ok: true, source: "portada" });
  });

  it("delega GET /libros/ al controlador getLibros", async () => {
    mockGetLibros.mockImplementation((_req, res) => {
      res.status(200).json({ ok: true, source: "listado" });
    });

    const response = await request(app).get("/libros");

    expect(response.status).toBe(200);
    expect(mockGetLibros).toHaveBeenCalledTimes(1);
    expect(response.body).toEqual({ ok: true, source: "listado" });
  });

  it("delega GET /libros/:id al controlador getPorId", async () => {
    mockGetPorId.mockImplementation((req, res) => {
      res.status(200).json({ ok: true, id: req.params.id });
    });

    const response = await request(app).get("/libros/10");

    expect(response.status).toBe(200);
    expect(mockGetPorId).toHaveBeenCalledTimes(1);
    expect(response.body).toEqual({ ok: true, id: "10" });
  });

  it("delega POST /libros/ al controlador postLibro", async () => {
    mockPostLibro.mockImplementation((req, res) => {
      res.status(201).json({ ok: true, body: req.body });
    });

    const payload = { titulo: "Nuevo libro" };
    const response = await request(app).post("/libros").send(payload);

    expect(response.status).toBe(201);
    expect(mockPostLibro).toHaveBeenCalledTimes(1);
    expect(response.body).toEqual({ ok: true, body: payload });
  });

  it("delega PUT /libros/:id al controlador putLibro", async () => {
    mockPutLibro.mockImplementation((req, res) => {
      res.status(200).json({ ok: true, id: req.params.id, body: req.body });
    });

    const payload = { titulo: "Actualizado" };
    const response = await request(app).put("/libros/11").send(payload);

    expect(response.status).toBe(200);
    expect(mockPutLibro).toHaveBeenCalledTimes(1);
    expect(response.body).toEqual({ ok: true, id: "11", body: payload });
  });

  it("delega DELETE /libros/:id al controlador borrarLibro", async () => {
    mockBorrarLibro.mockImplementation((req, res) => {
      res.status(200).json({ ok: true, id: req.params.id });
    });

    const response = await request(app).delete("/libros/12");

    expect(response.status).toBe(200);
    expect(mockBorrarLibro).toHaveBeenCalledTimes(1);
    expect(response.body).toEqual({ ok: true, id: "12" });
  });
});

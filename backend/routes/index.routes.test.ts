import express from "express";
import request from "supertest";
import Enrutador from "./index.routes";

jest.mock("./libros.routes", () => ({
  LibrosRouter: jest.fn().mockImplementation(() => ({
    getRouter: () => {
      const router = express.Router();
      router.get("/", (_req, res) => res.status(200).json({ source: "libros" }));
      return router;
    },
  })),
}));


jest.mock("../middleware/auth.middleware", () => ({
  authMiddleware: jest.fn((req, _res, next) => {
    req.user = { id: 1, mail: "test@example.com", nombre: "Test" };
    next();
  }),
}));

describe("Enrutador de la API", () => {
  const app = express();

  beforeAll(() => {
    app.use("/api", new Enrutador().getRoutes());
  });

  it("responde correctamente en /health", async () => {
    const response = await request(app).get("/api/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        status: "OK",
        message: "API funcionando correctamente",
      })
    );
  });

  it("monta las rutas de libros bajo /libros", async () => {
    const response = await request(app).get("/api/libros");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ source: "libros" });
  });
});
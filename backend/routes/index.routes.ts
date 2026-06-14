import express, { Router } from "express";
import { LibrosRouter } from "./libros.routes";
import { CategoriasRouter } from "./categorias.routes";
import { EstadisticasController } from "../controllers/estadisticas.controller";
import { LibrosController } from "../controllers/libros.controller";
import { UsuariosRouter } from "./usuarios.routes";

export default class Enrutador {
  private router: Router;

  constructor() {
    this.router = express.Router();
    this.RutaEstado();
    this.rutaLibros();
    this.rutaCategorias();
    this.rutaUsuarios();
  }

  private RutaEstado() {
    // Ruta de prueba
    this.router.get("/health", (req, res) => {
      res.status(200).json({
        status: "OK",
        message: "API funcionando correctamente",
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || "development",
      });
    });
  }

  private rutaLibros() {
    this.router.use("/libros", new LibrosRouter().getRouter());
    this.router.get("/estadisticas", new EstadisticasController().getEstadisticas);
  }

  private rutaCategorias() {
    this.router.use("/categorias", new CategoriasRouter().getRouter());
  }

  public getRoutes() {
    return this.router;
  }

  private rutaUsuarios() {
    this.router.use("/usuarios", new UsuariosRouter().getRouter());
  }
}

import { LibrosController } from "../controllers/libros.controller";
import { EstadoLibroController } from "../controllers/estado.libro.controller";
import express, { Router } from "express";
import { CalificacionController } from "../controllers/calificaciones.libros.controller";
import { authMiddleware } from "../middleware/auth.middleware";

export class LibrosRouter {
  private router: Router;

  public constructor() {
    this.router = express.Router();
    this.rutasLibros();
  }

  private rutasLibros(): void {
    const libroC: LibrosController = new LibrosController();
    const estadoC: EstadoLibroController = new EstadoLibroController();
    const calificacionC: CalificacionController = new CalificacionController();

    this.router.get("/portada/:id", authMiddleware, libroC.getPortada);
    this.router.get("/leidos", authMiddleware, estadoC.obtenerLeidos);
    this.router.get("/leyendo", authMiddleware, estadoC.obtenerLeyendo);
    this.router.get("/por-leer", authMiddleware, estadoC.obtenerPorLeer);

    this.router.get("/mejor-calificados", authMiddleware, calificacionC.getMejorCalificados);
    this.router.patch("/:id/calificacion", authMiddleware, calificacionC.actualizarCalificacion);
    this.router.get("/", authMiddleware, libroC.getLibros);
    this.router.patch("/:id/actualizarresenia", authMiddleware, libroC.patchResenia);
    this.router.get("/:id", authMiddleware, libroC.getPorId);
    this.router.post("/", authMiddleware, libroC.postLibro);
    this.router.put("/:id", authMiddleware, libroC.putLibro);
    this.router.delete("/:id", authMiddleware, libroC.borrarLibro);
    this.router.patch("/:id/estado", authMiddleware, estadoC.actualizarEstado);
  }

  public getRouter(): Router {
    return this.router;
  }
}
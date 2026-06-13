import { Router } from "express";
import { CategoriasController } from "../controllers/categorias.controller";

export class CategoriasRouter {
  private router: Router;

  constructor() {
    this.router = Router();
    this.rutasCategorias();
  }

  private rutasCategorias() {
    const categoriaController: CategoriasController = new CategoriasController();
    this.router.get("/", categoriaController.getCategorias);
    this.router.get("/:id", categoriaController.getCategoriaById);
    this.router.post("/", categoriaController.postCategoria);
    this.router.delete("/:id", categoriaController.deleteCategoria);
  }

  public getRouter(): Router {
    return this.router;
  }
}

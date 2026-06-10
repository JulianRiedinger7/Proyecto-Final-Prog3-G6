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
  }

  public getRouter(): Router {
    return this.router;
  }
}

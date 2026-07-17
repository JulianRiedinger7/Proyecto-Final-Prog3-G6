import { Router } from "express";
import { CategoriasController } from "../controllers/categorias.controller";
import { authMiddleware } from "../middleware/auth.middleware";

export class CategoriasRouter {
  private router: Router;

  constructor() {
    this.router = Router();
    this.rutasCategorias();
  }

  private rutasCategorias() {
    const categoriaController: CategoriasController = new CategoriasController();
    this.router.get("/", authMiddleware, categoriaController.getCategorias);
    this.router.get("/:id", authMiddleware, categoriaController.getCategoriaById);
    this.router.post("/", authMiddleware, categoriaController.postCategoria);
    this.router.delete("/:id", authMiddleware, categoriaController.deleteCategoria);
    this.router.put("/:id", authMiddleware, categoriaController.putCategoria);
  }

  public getRouter(): Router {
    return this.router;
  }
}

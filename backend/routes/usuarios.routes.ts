import { UsuariosController } from "../controllers/usuarios.controller";
import express, { Router } from "express";

export class UsuariosRouter {
  private router: Router;

  public constructor() {
    this.router = express.Router();
    this.rutasUsuarios();
  }

  private rutasUsuarios(): void {
    const usuarioC: UsuariosController = new UsuariosController();

    this.router.get("/", usuarioC.getUsuarios);
    this.router.get("/:id", usuarioC.getPorId);
    this.router.delete("/:id", usuarioC.deleteUsuario);
    this.router.post("/register", usuarioC.postRegister);
    this.router.post("/login", usuarioC.postLogin);
  }

  public getRouter(): Router {
    return this.router;
  }
}

import { Request, Response, NextFunction } from "express";

export class ErrorUsuarios {

  static manejadorErrores(err: any, req: Request, res: Response, next: NextFunction) {

    console.log(`[SERVER ERROR] ${err.message}`);

  if (
  err.name === "404-Usuarios" ||
  err.name === "404-Contrasenia" ||
  err.name === "404-Mail" ||
  err.name === "400-Registro" ||
  err.name === "409-MailExistente" ||
  err.name === "400-Login" ||
  err.name === "401-Login"
  ) {
  const codigo =
    err.name === "409-MailExistente" ? 409 :
    err.name === "401-Login" ? 401 :
    err.name.startsWith("400") ? 400 : 404;

      return res.status(codigo).json({

        error: err.message,

      });

    }

    next(err);

  }

}
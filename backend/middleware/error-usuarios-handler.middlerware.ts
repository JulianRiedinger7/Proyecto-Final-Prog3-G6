import { Request, Response, NextFunction } from "express";



export class ErrorUsuarios {

  static manejadorErrores(err: any, req: Request, res: Response, next: NextFunction) {

    console.log(`[SERVER ERROR] ${err.message}`);

    if (err.name === "404-Usuarios" || err.name === "404-Contrasenia" || err.name === "404-Mail") {

      return res.status(404).json({

        error: err.message,

      });

    }

    next(err);

  }

}
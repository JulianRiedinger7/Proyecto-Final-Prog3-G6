import { Request, Response, NextFunction } from "express";

export class ErrorAuth {
  static manejadorErrores(err: any, req: Request, res: Response, next: NextFunction) {
    console.log(`[AUTH ERROR] ${err.message}`);

    if (
      err.name === "401-TokenFaltante" ||
      err.name === "401-TokenExpirado" ||
      err.name === "401-TokenInvalido"
    ) {
      return res.status(401).json({ error: err.message });
    }

    next(err);
  }
}
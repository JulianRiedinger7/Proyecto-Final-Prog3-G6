import { Request, Response, NextFunction } from "express";
const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(`[SERVER ERROR] ${err.message}`);

  if (err.name === "SequelizeValidationError") {
    return res.status(400).json({
      error: "Error de validacion en la base de datos",
      detalles: err.errors.map((e: any) => e.message),
    });
  }

  return res.status(500).json({
    error: "Error interno del servidor",
  });
};

export default errorHandler;

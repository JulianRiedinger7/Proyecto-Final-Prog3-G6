import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export interface PayloadToken {
  id: number;
  mail: string;
  nombre: string;
}

// Extendemos el tipo Request para poder inyectar req.user
declare global {
  namespace Express {
    interface Request {
      user?: PayloadToken;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      const error = new Error("Token no proporcionado");
      error.name = "401-TokenFaltante";
      throw error;
    }

    const token = authHeader.split(" ")[1];

    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as PayloadToken;

    req.user = payload;

    next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      error.name = "401-TokenExpirado";
      error.message = "El token ha expirado";
    } else if (error.name === "JsonWebTokenError") {
      error.name = "401-TokenInvalido";
      error.message = "Token inválido";
    }
    next(error);
  }
};
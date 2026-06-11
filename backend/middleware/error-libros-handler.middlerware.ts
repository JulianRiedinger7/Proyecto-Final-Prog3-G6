import { Request, Response, NextFunction } from "express";

export class ErrorLibros {

    static manejadorErrores(err: any, req:Request, res: Response, next: NextFunction){
        console.log(`[SERVER ERROR] ${err.message}`);
        if (err.name === '404-Libros' || err.name === '404-Portada'
            || err.name === '404-IdLibro' ) {
            return res.status(404).json({
                error: err.message
            });
        }        
        next(err);
    }
}
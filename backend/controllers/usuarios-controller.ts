import { NextFunction, Request, Response } from "express";
import { Usuario } from "../models/usuario.model";

export class UsuariosController {

    public getUsuarios = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        let codigo: number = 404;
        let salida: object[] = [{}];
        let error: Error;

        try {
            codigo = 200;
            salida = await Usuario.traerTodos();

            if (!salida || salida.length === 0) {
                error = new Error("No hay usuarios registrados");
                error.name = "404-Usuarios";
                throw error;
            }

            return res.status(codigo).json(salida);
        } catch (error) {
            next(error);
        }
    };

    public getPorId = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        let codigo: number = 404;
        let salida: object | null = null;
        let error: Error;

        try {
            codigo = 200;
            salida = await Usuario.encontrarPorId(Number(req.params.id));

            if (!salida) {
                error = new Error(`El ID#${req.params.id} no existe`);
                error.name = "404-UsuarioId";
                throw error;
            }

            return res.status(codigo).json(salida);
        } catch (error) {
            next(error);
        }
    };

    public postUsuario = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        let codigo: number = 400;
        let salida: object;
        let error: Error;

        try {
            const { nombre, contrasenia, mail } = req.body;

            if (!nombre || !contrasenia || !mail) {
                error = new Error("Faltan datos del usuario");
                error.name = "400-Usuario";
                throw error;
            }

            codigo = 201;
            salida = await Usuario.crear({
                nombre,
                contrasenia,
                mail
            } as any);

            return res.status(codigo).json(salida);

        } catch (error) {
            next(error);
        }
    };

    public deleteUsuario = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        let codigo: number = 500;
        let salida: object | null = null;
        let error: Error;

        try {
            codigo = 200;
            salida = await Usuario.borrarPorId(Number(req.params.id));

            if (!salida) {
                error = new Error(`Usuario con ID#${req.params.id} no encontrado`);
                error.name = "404-UsuarioDelete";
                throw error;
            }

            return res.status(codigo).json({
                msg: "Usuario eliminado correctamente",
                usuario: salida
            });

        } catch (error) {
            next(error);
        }
    };
}
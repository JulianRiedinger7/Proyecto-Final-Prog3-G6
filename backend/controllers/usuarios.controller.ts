import { NextFunction, Request, Response } from "express";
import { Usuario } from "../models/usuario.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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

    public postRegister = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        let codigo: number = 400;
        let error: Error;

        try {
            const { nombre, contrasenia, mail } = req.body;

            if (!nombre || !contrasenia || !mail) {
                error = new Error("Faltan datos del usuario");
                error.name = "400-Registro";
                throw error;
            }

            const existente = await Usuario.encontrarPorMail(mail);
            if (existente) {
                error = new Error("Ya existe un usuario con ese mail");
                error.name = "409-MailExistente";
                throw error;
            }

            const contraseniaHasheada = await bcrypt.hash(contrasenia, 10);

            const nuevoUsuario = await Usuario.crear({
                nombre,
                mail,
                contrasenia: contraseniaHasheada
            } as any);

            
            codigo = 201;
            return res.status(codigo).json({
                id: nuevoUsuario.id,
                nombre: nuevoUsuario.nombre,
                mail: nuevoUsuario.mail
            });

        } catch (error) {
            next(error);
        }
    };

    public postLogin = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        let error: Error;

        try {
            const { mail, contrasenia } = req.body;

            if (!mail || !contrasenia) {
                error = new Error("Faltan credenciales");
                error.name = "400-Login";
                throw error;
            }

            const usuario = await Usuario.encontrarPorMail(mail);
            if (!usuario) {
                error = new Error("Credenciales inválidas");
                error.name = "401-Login";
                throw error;
            }

            const contraseniaValida = await bcrypt.compare(contrasenia, usuario.contrasenia);
            if (!contraseniaValida) {
                error = new Error("Credenciales inválidas");
                error.name = "401-Login";
                throw error;
            }

            const token = jwt.sign(
                { id: usuario.id, mail: usuario.mail, nombre: usuario.nombre },
                process.env.JWT_SECRET as string,
                { expiresIn: "24h" }
            );

            const { contrasenia: _, ...usuarioSinPassword } = usuario.toJSON();

            return res.status(200).json({
                usuario: usuarioSinPassword,
                token
            });

        } catch (error) {
            next(error);
        }
    };
}
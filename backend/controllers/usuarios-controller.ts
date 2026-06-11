import { NextFunction, Request, Response } from 'express';
import { Usuario } from '../models/Usuario';


export class UsuariosController {
    public getUsuarios = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        let codigo: number = 404;
        let salida: object [] = [{}];
        let error: Error;

        }
    }

    
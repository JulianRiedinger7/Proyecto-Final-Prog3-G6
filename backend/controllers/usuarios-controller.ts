import { NextFunction, Request, Response } from 'express';
import { Usuario } from '../models/usuario.model';


export class UsuariosController {
    public getUsuarios = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
        let codigo: number = 404;
        let salida: object [] = [{}];
        let error: Error;

        try {
            codigo = 200; 
            salida = await Usuario.traerTodos();
            if (!salida){
                error = Error('Usuario inexistente');
                error.name= "404-usuario";
                throw error;
            }           
            return res.status(codigo).json(salida);
        } catch (error) {
            next(error);
        }

        
    }


        
    }
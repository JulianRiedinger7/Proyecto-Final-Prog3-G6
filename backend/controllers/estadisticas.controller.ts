import {Response, Request, NextFunction} from 'express';
import {Estadisticas} from '../models/estadisticas.model';


export class EstadisticasController {
    public getEstadisticas = async (req:Request, res: Response, next: NextFunction): Promise<Response | void> => {
        let codigo: number;
        let salida: object; 
        try {codigo=200;
            salida=await Estadisticas.obtenerEstadisticas();
            return res.status(codigo).json(salida);}
            catch (error) {
                next(error);
                // codigo=404;
                // salida={msg: error};
            }
    }}

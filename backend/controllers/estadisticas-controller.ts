import {Response, Request} from 'express';
import {Estadisticas} from '../models/Libro';


export class EstadisticasController {
    public getEstadisticas = async (req:Request, res: Response): Promise<Response> => {
        let codigo: number;
        let salida: object; 

        try {codigo=200;
            salida=await Estadisticas.obtenerEstadisticas();}
            catch (error) {
                codigo=404;
                salida={msg: error};
            }
        return res.status(codigo).json(salida);
    }}


import { verificarToken } from "../middleware/auth";
import { LibrosController } from "../controllers/libros-controller";
import {EstadoLibroController} from "../controllers/estado-libro-controller";
import express, { Router } from 'express';


export class LibrosRouter {
    private router: Router;
    
    public constructor() {
        this.router = express.Router();
        this.rutasLibros();
    }

    private rutasLibros():void {
        const libroC:LibrosController = new LibrosController();
        const estadoC: EstadoLibroController = new EstadoLibroController();
        
        
        this.router.get('/portada/:id', libroC.getPortada);
        this.router.get('/leidos', estadoC.obtenerLeidos);
        this.router.get('/leyendo', estadoC.obtenerLeyendo);
        this.router.get('/por-leer', estadoC.obtenerPorLeer);

        
        this.router.get('/', libroC.getLibros);
        this.router.post('/', libroC.postLibro);
        this.router.put('/:id', libroC.putLibro);
        this.router.delete('/:id', libroC.borrarLibro);
        this.router.patch('/:id/estado', estadoC.actualizarEstado);

        
        this.router.get('/:id', libroC.getPorId);
    }

    public getRouter(): Router {
        return this.router;
    }
}




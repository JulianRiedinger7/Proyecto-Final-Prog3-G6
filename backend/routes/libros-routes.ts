import { verificarToken } from "../middleware/auth";
import { LibrosController } from "../controllers/libros-controller";
import express, { Router } from 'express';


export class LibrosRouter {
    private router: Router;
    
    public constructor() {
        this.router = express.Router();
        this.rutasLibros();
    }

    private rutasLibros():void {
        const libroC:LibrosController = new LibrosController();
        this.router.get('/', libroC.getLibros);
        this.router.get('/:id', libroC.getPorId);
        this.router.post('/', libroC.postLibro);
        this.router.put('/:id', libroC.putLibro);
        this.router.delete('/:id', libroC.borrarLibro);
        this.router.get('/portada/:id', libroC.getPortada);
    }

    public getRouter(): Router {
        return this.router;
    }
}




import { register, login, perfil } from "../controllers/authController";
import { verificarToken } from "../middleware/auth";
import express, { Router } from 'express';


export class AuthRouter {
    private router: Router;
    
    public constructor() {
        this.router = express.Router();
        this.rutasAuth();     
    }

    private rutasAuth():void {
        // POST /api/auth/register - Registro de usuario (pública)
        this.router.post('/register', register);

        // POST /api/auth/login - Inicio de sesión (pública)
        this.router.post('/login', login);

        // GET /api/auth/perfil - Obtener perfil (protegida)
        this.router.get('/perfil', verificarToken, perfil);
    }    

    public getRouter(): Router {
        return this.router;
    }
}




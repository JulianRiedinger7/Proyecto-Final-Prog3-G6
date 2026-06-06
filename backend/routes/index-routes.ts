import express, { Router } from 'express';
import { AuthRouter } from './auth-routes';
import { LibrosRouter } from './libros-routes';


export default class Enrutador {
  private router: Router;
  
  constructor () {
    this.router = express.Router();
    this.RutaEstado();
    this.rutaAuth();
    this.rutaLibros();
  }

  private RutaEstado() {
    // Ruta de prueba
    this.router.get('/health', (req, res) => {res.status(200).json({
          status: 'OK',
          message: 'API funcionando correctamente',
          timestamp: new Date().toISOString(),
          environment: process.env.NODE_ENV || 'development'
        });
    });
  }

  private rutaAuth() {
    // Rutas de autenticación
    this.router.use('/auth', new AuthRouter().getRouter());
  }

  private rutaLibros() {
    this.router.use('/libros', new LibrosRouter().getRouter());
  }

  public getRoutes() {
    return this.router;
  }
}
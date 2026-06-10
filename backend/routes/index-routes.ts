import express, { Router } from 'express';
import { LibrosRouter } from './libros-routes';


export default class Enrutador {
  private router: Router;
  
  constructor () {
    this.router = express.Router();
    this.RutaEstado();
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

  private rutaLibros() {
    this.router.use('/libros', new LibrosRouter().getRouter());
  }

  public getRoutes() {
    return this.router;
  }
}
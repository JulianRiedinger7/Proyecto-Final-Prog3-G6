import "reflect-metadata";
import express, { Application } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import { sequelize } from "../models";
import errorHandler from "../middleware/error-handler.middleware";
import Enrutador from "../routes/index-routes";
import { ErrorLibros } from "../middleware/error-libros-handler.middlerware";
//import { LibroSeeder } from "../seeders/20260606-seeder-libro";


//Clase Servidor 
export class Servidor {
  private app: Application;
  private port: string; 
  /*Metodo Constructor que mediante el metodo dotenv vuelca los datos de las
  variables de entorno del archivo .env en el process.env, luego genera una 
  instancia de express en el atributo app, guarda el puerto en el port y va 
  llamando los metodos privados de Middleware, rutas, errores y el saludo de 
  finalizacion de ejecución.
  */
  public constructor () {
    dotenv.config();
    this.app =  express();
    this.port = process.env.PORT || '3001';
    this.middleware()
    this.rutas()
    this.errores()
    this.saludo()
  }  

  private middleware() {
    this.app.use(helmet())
    this.app.use(cors({
      origin: process.env.CORS_ORIGIN || "http://localhost:3000",
      credentials: true,
    }))
    this.app.use(express.json({ limit: "10mb" }));
    this.app.use(express.urlencoded({ extended: true }));
    // Logging
    if (process.env.NODE_ENV !== "test") {
      this.app.use(morgan("combined"));
    }
  }

  private rutas() {
    const enrutador = new Enrutador();
    this.app.use("/api", enrutador.getRoutes());
    // Health check en la raíz
    this.app.get("/health", (req, res) => {
                  res.status(200).json({
                  status: "OK",
                  timestamp: new Date().toISOString(),
                  uptime: process.uptime(),
    });
  });
  // Manejo de rutas no encontradas
  this.app.use("*", (req, res) => {
    res.status(404).json({ error: "Route not found" });
  });
  }

  private errores() {
    this.app.use(ErrorLibros.manejadorErrores);
    this.app.use(errorHandler);
  }

  /*Metodo Publico que levanta la api al ser llamado (ojo primero tiene que
  ser instanciada la clase Servidor)*/
  public startServer = async (): Promise<void> => {
    try {
      // Probar conexión a la base de datos
      await sequelize.authenticate();
      console.log("✅ Database connection established successfully.");

      // En desarrollo, sincronizar modelos
      if (process.env.NODE_ENV === "development") {
        await sequelize.sync({ alter: false });
        console.log("✅ Database synchronized");
        const { LibroSeeder } = require('../seeders/20260606-seeder-libro');
        await LibroSeeder.generarSeed();
      }

      this.app.listen(this.port, () => {
        console.log(`🚀 Server is running on port ${this.port}`);
        console.log(`📝 Environment: ${process.env.NODE_ENV || "development"}`);
        console.log(`🔗 API available at: http://localhost:${this.port}/api`);
      });
    } catch (error) {
    console.error("❌ Unable to start server:", error);
    // Continuar sin base de datos para desarrollo
      this.app.listen(this.port, () => {
        console.log(`⚠️  Server started without database on port ${this.port
        }`);
      });
    }
  }

  private saludo() {
    // Manejo de cierre graceful
    process.on("SIGTERM", async () => {
      console.log("SIGTERM received, shutting down gracefully");
      try {
        await sequelize.close();
      } catch (error) {
        console.error("Error closing database:", error);
      }
      process.exit(0);
    });

    process.on("SIGINT", async () => {
      console.log("SIGINT received, shutting down gracefully");
      try {
        await sequelize.close();
      } catch (error) {
        console.error("Error closing database:", error);
      }
      process.exit(0);
    });
  }
}

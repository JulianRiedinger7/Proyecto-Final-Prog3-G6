// backend/models/index.ts
import { Sequelize } from "sequelize-typescript";
import { Dialect } from "sequelize";
import config from "../config/database";
import { DatabaseConfig } from "../interfaces/dbConfig.interface";
import { Libro } from "./libro.model";
import { Categoria } from "./categoria.model";
import { Usuario } from "./usuario.model";
type NodeEnv = keyof DatabaseConfig;

class Index {
  private static instancia: Index;
  public readonly sequelize: Sequelize;

  public constructor() {
    const env = (process.env.NODE_ENV || "development") as NodeEnv;
    const dbConfig = config[env as keyof DatabaseConfig];

    this.sequelize = new Sequelize(dbConfig.database!, dbConfig.username!, dbConfig.password, {
      host: dbConfig.host,
      port: Number(dbConfig.port),
      dialect: dbConfig.dialect as Dialect,
      logging: dbConfig.logging,
      models: [Libro, Categoria, Usuario],
      ...("pool" in dbConfig ? { pool: dbConfig.pool } : {}),
      ...("dialectOptions" in dbConfig ? { dialectOptions: dbConfig.dialectOptions } : {}),
    });
  }

  public static getInstance(): Index {
    if (!Index.instancia) {
      Index.instancia = new Index();
    }
    return Index.instancia;
  }
}

const db = Index.getInstance();
export const { sequelize } = db;
export { Sequelize, Libro, Categoria, Usuario };
export default db;

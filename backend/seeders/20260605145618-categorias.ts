"use strict";
import { ICategoria } from "../interfaces/categoria.interface";
import { sequelize } from "../models";
import { Categoria } from "../models";

export class CategoriaSeeder {
  protected static readonly categoriasACargar: ICategoria[] = [
    { nombre: "Ciencia Ficcion" },
    { nombre: "Historia" },
    { nombre: "Fantasia" },
    { nombre: "Misterio" },
    { nombre: "Romance" },
    { nombre: "Terror" },
  ];

  public static async cargarCategorias(): Promise<void> {
    const registrosEnBDD: number = await Categoria.count();
    if (registrosEnBDD > 0) {
      console.log("La tabla de categorías ya contiene registros!");
      return;
    }

    try {
      await Categoria.bulkCreate(this.categoriasACargar as ICategoria[]);
      console.log(
        `Se lograron insertar ${this.categoriasACargar.length} categorías en la base de datos.`,
      );
    } catch (error) {
      console.error("Error al cargar las categorías:", error);
      throw error;
    }
  }
}

import { ICategoria } from "../interfaces/categoria.interface";
import {
  Table,
  Column,
  Model,
  PrimaryKey,
  AutoIncrement,
  AllowNull,
  HasMany,
  Validate,
} from "sequelize-typescript";
import { DataTypes } from "sequelize";
import { Libro } from "./libro.model";

@Table({
  tableName: "categorias",
  timestamps: true,
})
export class Categoria extends Model<ICategoria> implements ICategoria {
  @PrimaryKey
  @AutoIncrement
  @Column(DataTypes.INTEGER)
  id?: number;

  @AllowNull(false)
  @Validate({
    notEmpty: {
      msg: "El nombre de la categoría no puede estar vacío",
    },
  })
  @Column(DataTypes.STRING)
  nombre!: string;

  @HasMany(() => Libro)
  libros?: Libro[];

  public static async traerTodas(): Promise<ICategoria[] | []> {
    return await Categoria.findAll();
  }

  public static async encontrarPorId(id: number): Promise<ICategoria | null> {
    return await Categoria.findByPk(id);
  }

  public static async crear(categoria: ICategoria): Promise<ICategoria> {
    return await Categoria.create(categoria);
  }

  public static async borrar(id: number): Promise<ICategoria | null> {
    const categoria = await Categoria.findByPk(id);
    if (categoria) {
      await categoria.destroy();
      return categoria;
    }
    return null;
  }

  public static async contar(): Promise<number> {
    return await Categoria.count();
  }
}

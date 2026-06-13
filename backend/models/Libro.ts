import { Table, Column, Model, PrimaryKey, AutoIncrement, AllowNull, BelongsTo, ForeignKey } from 'sequelize-typescript';
import { InterfaceLibro, EstadoLectura, ActualizarReseña } from '../interfaces/Libro-interface';
import { DataTypes, Op } from 'sequelize';
import { EstadisticasLibro } from '../interfaces/Estadistica-interface';
import { Usuario } from './usuario.model';
import { Categoria } from './categoria.model';
@Table({
    tableName: 'libros',
    timestamps: true 
})



export class Libro extends Model<InterfaceLibro> implements InterfaceLibro {
    @PrimaryKey
    @AutoIncrement
    @Column(DataTypes.INTEGER)
    id?: number;

    @AllowNull(false)
    @Column(DataTypes.STRING)
    titulo!: string;

    @AllowNull(false)
    @Column(DataTypes.STRING)
    autor!: string;

    @AllowNull(false)
    @Column(DataTypes.INTEGER)
    anio!: number;

    @AllowNull(true)
    @Column(DataTypes.STRING)
    portada?: string;

    @AllowNull(false)
    @Column({ type: DataTypes.ENUM(...Object.values(EstadoLectura)) })
    estado!: EstadoLectura;

    @AllowNull(true)
    @Column(DataTypes.DECIMAL(3,1))
    puntaje?: number;

    @AllowNull(true)
    @Column(DataTypes.STRING)
    resenia?: string;

    @ForeignKey(() => Categoria)
    @AllowNull(true)
    @Column(DataTypes.INTEGER)
    generoId?: number;
 
    @BelongsTo(() => Categoria)
    categoria?: Categoria;

    @ForeignKey(() => Usuario)
    @AllowNull(true)
    @Column(DataTypes.INTEGER)
    usuarioId?: number;
 
    @BelongsTo(() => Usuario)
    usuario?: Usuario;

    static async encontrarPorId (id: number): Promise<Libro | null> {
        return await Libro.findByPk(id, {
            include: [
                {model: Categoria, attributes: ['id', 'nombre']},
                {model: Usuario, attributes: ['id', 'nombre']}
            ]
        });
    }

    static async traerTodos (): Promise<InterfaceLibro[] | []> {
        return await Libro.findAll({
            include: [
                {model: Categoria, attributes: ['id', 'nombre']},
                {model: Usuario, attributes: ['id', 'nombre']}
            ]
        });
    }

    static async crear(libro: InterfaceLibro): Promise<InterfaceLibro> {
        return await Libro.create(libro);
    }

    static async actualizarLibro(id: number, libro:Partial<InterfaceLibro>): Promise<Libro | null> {
        const libroBd: Libro | null= await Libro.findByPk(id);
        let salida: any = null;
        if (libroBd) {
            await libroBd.update(libro);
            await libroBd.reload();
            salida = libroBd;
        }
        return salida;
    }

    static async borrarPorId(id:number): Promise<Libro | null> {
        const libroBd: Libro | null = await Libro.findByPk(id);
        let salida: any = null;
        if (libroBd) {
            salida = libroBd;
            await libroBd.destroy();
        }
        return salida;
    }

    static async contar():Promise<number> {
        return await Libro.count();
    }

    static async getPortada(id:number):Promise<string | undefined> {
        return (await Libro.findByPk(id, { attributes: ['portada'], raw: true}))?.portada;
    }

    static async actualizarResenia(id: number, resenia: ActualizarReseña): Promise<Libro | null> {
        const librobD: Libro | null = await Libro.findByPk(id); 
        let salida: any = null;
        if (librobD) {
            await librobD.update(resenia);
            await librobD.reload();
            salida = librobD;
        }
        return salida;
    }

}




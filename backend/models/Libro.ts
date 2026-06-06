import { Table, Column, Model, PrimaryKey, AutoIncrement, AllowNull } from 'sequelize-typescript'
import { InterfaceLibro, EstadoLectura } from '../interfaces/Libro-interface'
import { DataTypes } from 'sequelize'

@Table({
    tableName: 'libros',
    timestamps: true
})

export class Libro extends Model<InterfaceLibro> implements InterfaceLibro {
    @PrimaryKey
    @AutoIncrement
    @Column(DataTypes.INTEGER)
    id?: number

    @AllowNull(false)
    @Column(DataTypes.STRING)
    titulo!: string

    @AllowNull(false)
    @Column(DataTypes.STRING)
    autor!: string

    @AllowNull(false)
    @Column(DataTypes.INTEGER)
    anio!: number

    @AllowNull(true)
    @Column(DataTypes.STRING)
    portada!: string

    @AllowNull(false)
    @Column({ type: DataTypes.ENUM(...Object.values(EstadoLectura)) })
    estado!: EstadoLectura

    @AllowNull(true)
    @Column(DataTypes.DECIMAL(3,1))
    puntaje?: number

    @AllowNull(true)
    @Column(DataTypes.STRING)
    resenia?: string

    @AllowNull(true)
    @Column(DataTypes.INTEGER)
    generoId?: number

    @AllowNull(true)
    @Column(DataTypes.INTEGER)
    usuarioId?: number

    @AllowNull(false)
    @Column(DataTypes.DATE)
    createdAt!: string

    @AllowNull(false)
    @Column(DataTypes.DATE)
    updateAt!: string

    static async encontrarPorId (id: number): Promise<Libro | null> {
        return await Libro.findByPk(id)
    }

    static async traerTodos (): Promise<[Libro] | []> {
        return await Libro.findByAll()
    }

    static async crear(libro: InterfaceLibro): Promise<Libro> {
        return await Libro.create(Libro)
    }

    static async actualizarLibro(id: number, libro:Partial<InterfaceLibro>): Promise<Libro | null> {
        const libroBd: Libro = await Libro.findByPk(id)
        let salida: any = null
        if (libroBd) {
           await libroBd.update(libro)
           await libroBd.reload()
           salida = libroBd
        }
        return salida
    }

}

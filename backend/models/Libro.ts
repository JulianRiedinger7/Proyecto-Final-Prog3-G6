import { Table, Column, Model, PrimaryKey, AutoIncrement, AllowNull } from 'sequelize-typescript';
import { InterfaceLibro, EstadoLectura, ActualizarReseña } from '../interfaces/Libro-interface';
import { DataTypes, Op } from 'sequelize';
import { EstadisticasLibro } from '../interfaces/Estadistica-interface';

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

    @AllowNull(true)
    @Column(DataTypes.INTEGER)
    generoId?: number;

    @AllowNull(true)
    @Column(DataTypes.INTEGER)
    usuarioId?: number;


    static async encontrarPorId (id: number): Promise<Libro | null> {
        return await Libro.findByPk(id);
    }

    static async traerTodos (): Promise<InterfaceLibro[] | []> {
        return await Libro.findAll();
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

export class Estadisticas { 
    static async obtenerEstadisticas(): Promise <EstadisticasLibro> {
    const totalLibros = await Libro.count();
    const librosLeidos = await Libro.count({ where: { estado: EstadoLectura.Leido } });
    const librosLeyendo = await Libro.count({ where: { estado: EstadoLectura.Leyendo } });
    const librosPorLeer = await Libro.count({ where: { estado: EstadoLectura.PorLeer } });
    const leidoReciente = await Libro.findOne({ where: { estado: { [Op.or]: [EstadoLectura.Leido, EstadoLectura.Leyendo] } }, order: [['updatedAt', 'DESC']] }); 
    const terminadoReciente = await Libro.findOne({ where: { estado: EstadoLectura.Leido }, order: [['updatedAt', 'DESC']] }); //de Timestaps = T, sale de ahí el updateAT
    const ultimoIncorporado = await Libro.findOne({ order: [['createdAt', 'DESC']] });
    return {
        TotalLibros: totalLibros,
        LibrosLeidos: librosLeidos,
        LibrosLeyendo: librosLeyendo,
        LibrosPorLeer: librosPorLeer,
        LeidoReciente: leidoReciente?.titulo || '-',
        TerminadoReciente: terminadoReciente?.titulo || '-',
        UltimoIncorporad: ultimoIncorporado?.titulo || '-'
    };
}
}




import { Table, Column, Model, PrimaryKey, AutoIncrement, AllowNull } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';
import { InterfaceUsuario } from '../interfaces/Usuario.interface';

@Table({
    tableName: 'usuarios',
    timestamps: true 
})


export class Usuario extends Model<InterfaceUsuario> implements InterfaceUsuario {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id?: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    nombre!: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    contrasenia!: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    mail!: string;


    static async encontrarPorId (id: number): Promise<InterfaceUsuario | null> {
        return await Usuario.findByPk(id);
    }

    static async traerTodos (): Promise<InterfaceUsuario[] | []> {
        return await Usuario.findAll();
    }

    static async crear(usuario: InterfaceUsuario): Promise<InterfaceUsuario> {
        return await Usuario.create(usuario);
    }


    static async borrarPorId(id:number): Promise<InterfaceUsuario | null> {
        const usuarioBd: Usuario | null = await Usuario.findByPk(id);
        let salida: any = null;
        if (usuarioBd) {
            salida = usuarioBd;
            await usuarioBd.destroy();
        }
        return salida;
    }
}





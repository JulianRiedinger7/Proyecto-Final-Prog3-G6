import { Table, Column, Model, PrimaryKey, AutoIncrement, AllowNull } from 'sequelize-typescript';
import { DataType } from 'sequelize-typescript';

@Table({
    tableName: 'usuarios',
    timestamps: true 
})


export class Usuario extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id?: number;

    @AllowNull(false)
    @Column(DataType.STRING)
    nombre!: string;

    @AllowNull(false)
    @Column(DataType.STRING)
    contrasenia?: string;


    @AllowNull(true)
    @Column(DataType.INTEGER)
    usuarioId?: number;
}





import { Table, Column, Model, PrimaryKey, AutoIncrement, AllowNull } from 'sequelize-typescript';


@Table({
    tableName: 'usuarios',
    timestamps: true 
})


export class Usuario extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column(DataTypes.INTEGER)
    id?: number;

    @AllowNull(false)
    @Column(DataTypes.STRING)
    nombre!: string;

    @AllowNull(false)
    @Column(DataTypes.STRING)
    contrasenia?: string;


    @AllowNull(true)
    @Column(DataTypes.INTEGER)
    usuarioId?: number;
}





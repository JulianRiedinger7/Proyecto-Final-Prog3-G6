import { sequelize } from "../models";
import { Usuario } from "../models";
import { InterfaceUsuario } from "../interfaces/Usuario.interface";


export class UsuarioSeeder {
    protected static readonly UsuariosACargar: InterfaceUsuario[] = [ 
         {
            nombre: 'Maria',
            mail: 'maria123@gmail.com',
            contrasenia: 'maria123'
        },
        {
            nombre: 'Roberto',
            mail: 'robertojuajua@gmail.com',
            contrasenia: 'lalala123'
        },
        {
           nombre: 'Alejandro',
            mail: 'alejandro@gmail.com',
            contrasenia: 'soyale'
        }

    ];

    public static async generarSeed():Promise<void> {
        const registrosEnBDD: number = await Usuario.count();
        if (registrosEnBDD > 0) {
            console.log('La tabla contiene registros!');
            return;
        }
        try {
            await Usuario.bulkCreate(this.UsuariosACargar as InterfaceUsuario[]);
            console.log(`Se insertaron ${this.UsuariosACargar.length} filas`);
        } catch (error) {
            console.error('Error insertando las filas', error);
            throw error;
        }
    }
}
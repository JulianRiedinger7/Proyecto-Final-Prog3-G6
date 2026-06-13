import { sequelize } from "../models";
import { Libro } from "../models";
import { InterfaceLibro } from "../interfaces/libro.interface";
import { EstadoLectura } from "../interfaces/libro.interface";

//Para las portadas se utiliza la api de Open Library
// Para llamar a las portadas es con el Open Library ID 
//https://covers.openlibrary.org/b/olid/<String-BBDD-portada><tamaño>.jpg
//Tamaños disponibles: S - M - L
export class LibroSeeder {
    protected static readonly librosACargar: InterfaceLibro[] = [ 
         {
            titulo: 'El Señor de los Anillos',
            autor: 'J.R.R. Tolkien',
            anio: 1954,
            portada: 'OL9137998',
            estado: EstadoLectura.PorLeer,
            puntaje: 5,
            resenia: 'Una obra maestra de la fantasía épica.',
            generoId: 1
        },
        {
            titulo: 'Cien Años de Soledad',
            autor: 'Gabriel García Márquez',
            anio: 1967,
            portada: 'OL17228124',
            estado: EstadoLectura.PorLeer,
            puntaje: 5,
            resenia: 'El realismo mágico en su máxima expresión.',
            generoId: 2
        },
        {
            titulo: '1984',
            autor: 'George Orwell',
            anio: 1949,
            portada: 'OL33338961',
            estado: EstadoLectura.PorLeer,
            puntaje: 4,
            resenia: 'Una distopía perturbadora y vigente.',
            generoId: 3
        },
        {
            titulo: 'Don Quijote de la Mancha',
            autor: 'Miguel de Cervantes',
            anio: 1605,
            estado: EstadoLectura.PorLeer,
            generoId: 4
        },
        {
            titulo: 'El Aleph',
            autor: 'Jorge Luis Borges',
            anio: 1949,
            portada: 'OL37789016',
            estado: EstadoLectura.PorLeer,
            puntaje: 5,
            resenia: 'Cuentos que expanden la percepción del tiempo y el espacio.',
            generoId: 1
        },
        {
            titulo: 'Por qué fracasan los países',
            autor: 'James A. Robinson',
            anio: 2012,
            portada: 'OL16568759',
            estado: EstadoLectura.PorLeer,
            puntaje: 5,
            generoId: 6
        }
    ];

    public static async generarSeed():Promise<void> {
        const registrosEnBDD: number = await Libro.contar();
        if (registrosEnBDD > 0) {
            console.log('La tabla contiene registros!');
            return;
        }
        try {
            await Libro.bulkCreate(this.librosACargar as InterfaceLibro[]);
            console.log(`Se insertaron ${this.librosACargar.length} filas`);
        } catch (error) {
            console.error('Error insertando las filas', error);
            throw error;
        }
    }
}
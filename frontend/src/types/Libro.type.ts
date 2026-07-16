import { type Genero } from './Genero.type';

export interface Libro {
    id?: number;
    titulo: string;
    autor: string;
    anio: number;
    portada?: string;
    estado: 'por leer' | 'leyendo' | 'leido';
    puntaje?: number;
    resenia?: string;
    generoId?: number;
    Categoria?: Genero;
}
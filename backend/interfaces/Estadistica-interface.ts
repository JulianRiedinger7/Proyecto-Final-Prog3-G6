import {EstadoLectura} from "../interfaces/Libro-interface";

export interface EstadisticasLibro {
    TotalLibros: number,
    LibrosLeidos: number, 
    LibrosLeyendo: number,
    LibrosPorLeer: number,
    LeidoReciente: string,
    TerminadoReciente: string,
    UltimoIncorporad: string,
}
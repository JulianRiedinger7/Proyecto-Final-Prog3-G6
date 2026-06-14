import { Libro } from "../models/libro.model";
import { EstadisticasLibro } from '../interfaces/Estadistica.interface';
import { EstadoLectura } from "../interfaces/Libro.interface";
import { Op } from "sequelize";

export class Estadisticas { 
    static async obtenerEstadisticas(): Promise <EstadisticasLibro> {
    const totalLibros = await Libro.contar();
    const librosLeidos = await Libro.contarPorEstado(EstadoLectura.Leido);
    const librosLeyendo = await Libro.contarPorEstado(EstadoLectura.Leyendo);
    const librosPorLeer = await Libro.contarPorEstado(EstadoLectura.PorLeer);
    const leidoReciente = await Libro.leyendoRecientemente();
    const terminadoReciente = await Libro.terminadoRecientemente();
    const ultimoIncorporado = await Libro.incorporadoRecientemente();
    return {
        TotalLibros: totalLibros,
        LibrosLeidos: librosLeidos,
        LibrosLeyendo: librosLeyendo,
        LibrosPorLeer: librosPorLeer,
        LeidoReciente: leidoReciente || '-',
        TerminadoReciente: terminadoReciente || '-',
        UltimoIncorporad: ultimoIncorporado || '-'
    };
}
}
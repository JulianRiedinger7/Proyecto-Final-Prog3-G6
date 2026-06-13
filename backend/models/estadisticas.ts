import { Libro } from "./Libro";
import { EstadisticasLibro } from '../interfaces/Estadistica-interface';
import { EstadoLectura } from "../interfaces/Libro-interface";
import { Op } from "sequelize";

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
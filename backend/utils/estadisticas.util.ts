import { Libro } from "../models/libro.model";
import { EstadisticasLibro } from "../interfaces/Estadistica.interface";
import { EstadoLectura } from "../interfaces/Libro.interface";

export class Estadisticas {
  static async obtenerEstadisticas(usuarioId: number): Promise<EstadisticasLibro> {
    const totalLibros = await Libro.contar(usuarioId);
    const librosLeidos = await Libro.contarPorEstado(EstadoLectura.Leido, usuarioId);
    const librosLeyendo = await Libro.contarPorEstado(EstadoLectura.Leyendo, usuarioId);
    const librosPorLeer = await Libro.contarPorEstado(EstadoLectura.PorLeer, usuarioId);
    const leidoReciente = await Libro.leyendoRecientemente(usuarioId);
    const terminadoReciente = await Libro.terminadoRecientemente(usuarioId);
    const ultimoIncorporado = await Libro.incorporadoRecientemente(usuarioId);
    return {
      TotalLibros: totalLibros,
      LibrosLeidos: librosLeidos,
      LibrosLeyendo: librosLeyendo,
      LibrosPorLeer: librosPorLeer,
      LeidoReciente: leidoReciente || "-",
      TerminadoReciente: terminadoReciente || "-",
      UltimoIncorporad: ultimoIncorporado || "-",
    };
  }
}
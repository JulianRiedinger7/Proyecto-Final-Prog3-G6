import { type Estadisticas } from "../types/Estadisticas.type";
import { type Libro } from "../types/Libro.type";
import api from "./api";

export const obtenerEstadisticas = async (): Promise<Estadisticas> => {
  try {
    const response = await api.get<Estadisticas>("/estadisticas");
    return response.data;
  } catch (error: Error | unknown) {
    throw new Error(`Error al obtener las estadísticas: ${(error as Error).message}`, {
      cause: error,
    });
  }
};

export const obtenerLibrosLeyendo = async (): Promise<Libro[]> => {
  try {
    const response = await api.get<Libro[]>("/libros");
    return response.data;
  } catch (error: Error | unknown) {
    throw new Error(`Error al obtener los libros en lectura: ${(error as Error).message}`, {
      cause: error,
    });
  }
};

export const obtenerLibrosMejorCalificados = async (): Promise<Libro[]> => {
  try {
    const response = await api.get<Libro[]>("/libros/mejor-calificados");
    return response.data;
  } catch (error: Error | unknown) {
    throw new Error(`Error al obtener los libros mejor calificados: ${(error as Error).message}`, {
      cause: error,
    });
  }
};

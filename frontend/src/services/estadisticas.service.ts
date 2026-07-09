import axios from "axios";
import { type Estadisticas } from "../types/Estadisticas.type";
import { type Libro } from "../types/Libro.type";
const API_URL = import.meta.env.VITE_API_URL as string;

export const obtenerEstadisticas = async (): Promise<Estadisticas> => {
  try {
    const response = await axios.get<Estadisticas>(`${API_URL}/estadisticas`);
    return response.data;
  } catch (error: Error | unknown) {
    throw new Error(`Error al obtener las estadísticas: ${(error as Error).message}`, {
      cause: error,
    });
  }
};

export const obtenerLibrosLeyendo = async (): Promise<Libro[]> => {
  try {
    const response = await axios.get<Libro[]>(`${API_URL}/libros/leyendo`);
    return response.data;
  } catch (error: Error | unknown) {
    throw new Error(`Error al obtener los libros en lectura: ${(error as Error).message}`, {
      cause: error,
    });
  }
};

export const obtenerLibrosMejorCalificados = async (): Promise<Libro[]> => {
  try {
    const response = await axios.get<Libro[]>(`${API_URL}/libros/mejor-calificados`);
    return response.data;
  } catch (error: Error | unknown) {
    throw new Error(`Error al obtener los libros mejor calificados: ${(error as Error).message}`, {
      cause: error,
    });
  }
};

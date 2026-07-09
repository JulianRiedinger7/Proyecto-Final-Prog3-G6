import axios from "axios";
import { type Estadisticas } from "../types/Estadisticas.type";
const API_URL = import.meta.env.VITE_API_URL;

export const obtenerEstadisticas = async (): Promise<Estadisticas> => {
  try {
    const response = await axios.get<Estadisticas>(`${API_URL}/estadisticas`);
    return response.data;
  } catch (error: Error | unknown) {
    throw new Error("Error al obtener las estadísticas: ", error as Error);
  }
};

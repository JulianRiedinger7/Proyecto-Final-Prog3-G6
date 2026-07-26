import api from "./api";
import { type Libro } from "../types/Libro.type";

export class librosService {
  public static getLibros = async (): Promise<Libro[]> => {
    try {
      const respuesta = await api.get("/libros");
      return respuesta.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  public static getLibroPorId = async (id: number): Promise<Libro | null> => {
    try {
      const respuesta = await api.get(`/libros/${id}`);
      return respuesta.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  public static crearLibro = async (libro: Omit<Libro, "id">): Promise<Libro | null> => {
    try {
      const respuesta = await api.post("/libros", libro);
      return respuesta.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  public static editarLibro = async (id: number, libro: Partial<Libro>): Promise<Libro | null> => {
    try {
      const respuesta = await api.put(`/libros/${id}`, libro);
      return respuesta.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  public static eliminarLibro = async (id: number): Promise<void> => {
    try {
      await api.delete(`/libros/${id}`);
    } catch (error) {
      console.error(error);
    }
  };

  public static obtenerPortadaUrl = (portada: string): string => {
    return `https://covers.openlibrary.org/b/olid/${portada}M.jpg`;
  };
}

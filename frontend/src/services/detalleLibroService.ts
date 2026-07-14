import api from './api'

export async function obtenerLibro(id: number): Promise<Libro> {
 const { data } = await api.get<Libro>(`/libros/${id}`);
  return data;
}

export interface Libro {
  id:number;
  titulo: string;
  autor: string;
  anio: number;
  portada: string;
  estado: string;  
  puntaje: number;
  generoId: number;
  resenia: string; 
}

export async function actualizarResenia(id: number, resenia: string, puntaje: number): Promise<Libro> {
  const { data } = await api.patch<Libro>(`/libros/${id}`, { resenia, puntaje }); //de todo esto que parece muy poco lo hace AXIOS en ./api
  return data;
}
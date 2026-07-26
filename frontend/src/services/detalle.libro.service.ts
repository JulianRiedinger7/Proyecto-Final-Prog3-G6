import api from './api'
import type { AxiosResponse } from "axios";
import type { Libro } from '../types/Libro.type';

export async function actualizarResenia(id: number, resenia: string, puntaje: number): Promise<AxiosResponse<Libro>> {
  const [reseniaResponse, calificacionResponse] = await Promise.all([
    api.patch<Libro>(`/libros/${id}/actualizarresenia`, { resenia }),
    api.patch<Libro>(`/libros/${id}/calificacion`, { puntaje }),
  ]);

  return reseniaResponse.data && calificacionResponse.data
    ? { ...reseniaResponse, data: calificacionResponse.data }
    : reseniaResponse;
}
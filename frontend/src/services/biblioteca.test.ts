import { describe, it, expect, vi } from 'vitest';
import api from './api';
import { obtenerLibro, actualizarResenia } from './detalleLibroService';

vi.mock('./api');

describe('obtenerLibro', () => {
  it('devuelve el libro cuando la request es exitosa', async () => {
    const libroFake = {
      id: 1,
      titulo: 'Cien años de soledad',
      autor: 'García Márquez',
      anio: 1967,
      portada: 'url-fake.jpg',
      estado: 'leido',
      puntaje: 5,
      generoId: 2,
      resenia: 'Excelente',
    };

    (api.get as any).mockResolvedValueOnce({ data: libroFake });

    const resultado = await obtenerLibro(1);

    expect(resultado).toEqual(libroFake);
    expect(api.get).toHaveBeenCalledWith('/libros/1');
  });
});

describe('actualizarResenia', () => {
  it('actualiza la reseña correctamente', async () => {
    const libroActualizado = {
      id: 1,
      titulo: 'Cien años de soledad',
      autor: 'García Márquez',
      anio: 1967,
      portada: 'url-fake.jpg',
      estado: 'leido',
      puntaje: 5,
      generoId: 2,
      resenia: 'Muy bueno, lo recomiendo',
    };

    (api.patch as any).mockResolvedValueOnce({ data: libroActualizado });

    const resultado = await actualizarResenia(1, 'Muy bueno, lo recomiendo', 5);

    expect(resultado).toEqual(libroActualizado);
    expect(api.patch).toHaveBeenCalledWith('/libros/1', {
      resenia: 'Muy bueno, lo recomiendo',
      puntaje: 5,
    });
  });
});
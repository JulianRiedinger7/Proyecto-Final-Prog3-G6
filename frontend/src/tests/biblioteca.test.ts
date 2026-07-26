import { describe, it, expect, vi } from 'vitest';
import api from '../services/api';
import {actualizarResenia } from '../services/detalle.libro.service';
import { librosService } from "../services/libro.service";

vi.mock('../services/api');

describe('librosService.getLibroPorId', () => {
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

    const resultado = await librosService.getLibroPorId(1);

    expect(resultado).toEqual(libroFake);
    expect(api.get).toHaveBeenCalledWith('/libros/1');
  });
});

describe('actualizarResenia', () => {
  it('actualiza la reseña y el puntaje en los endpoints correspondientes', async () => {
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

    (api.patch as any)
      .mockResolvedValueOnce({ data: libroActualizado })
      .mockResolvedValueOnce({ data: libroActualizado });

    const resultado = await actualizarResenia(1, 'Muy bueno, lo recomiendo', 5);

    expect(resultado).toEqual(libroActualizado);
    expect(api.patch).toHaveBeenNthCalledWith(1, '/libros/1/actualizarresenia', {
      resenia: 'Muy bueno, lo recomiendo',
    });
    expect(api.patch).toHaveBeenNthCalledWith(2, '/libros/1/calificacion', {
      puntaje: 5,
    });
  });
});
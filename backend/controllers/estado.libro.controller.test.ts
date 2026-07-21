import { EstadoLibroController } from './estado.libro.controller';
import { Libro } from '../models/libro.model';
import { EstadoLectura } from '../interfaces/Libro.interface';
import { Request, Response, NextFunction } from 'express';

// Mockea el modelo Libro
jest.mock('../models/libro.model');

const controller = new EstadoLibroController();

// Helpers para crear mocks de req, res, next
const mockReq = (params = {}, body = {}, user = { id: 1 }) => ({
    params,
    body,
    user,
}) as unknown as Request;

const mockRes = () => {
    const res = {} as Response;
    res.json = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    return res;
};

const mockNext = () => jest.fn() as unknown as NextFunction;

describe('EstadoLibroController', () => {

    describe('obtenerLeidos', () => {

        it('devuelve los libros con estado leido', async () => {
            const librosMock = [
                { id: 1, titulo: 'Dune', estado: EstadoLectura.Leido }
            ];
            (Libro.traerPorEstado as jest.Mock).mockResolvedValue(librosMock);

            const req = mockReq();
            const res = mockRes();
            const next = mockNext();

            await controller.obtenerLeidos(req, res, next);

            expect(Libro.traerPorEstado).toHaveBeenCalledWith(EstadoLectura.Leido, 1);
            expect(res.json).toHaveBeenCalledWith(librosMock);
        });

        it('devuelve array vacío si no hay libros leídos', async () => {
            (Libro.traerPorEstado as jest.Mock).mockResolvedValue([]);

            const req = mockReq();
            const res = mockRes();
            const next = mockNext();

            await controller.obtenerLeidos(req, res, next);

            expect(res.json).toHaveBeenCalledWith([]);
        });

        it('llama a next si ocurre un error', async () => {
            (Libro.traerPorEstado as jest.Mock).mockRejectedValue(new Error('DB error'));

            const req = mockReq();
            const res = mockRes();
            const next = mockNext();

            await controller.obtenerLeidos(req, res, next);

            expect(next).toHaveBeenCalled();
        });

    });

    describe('obtenerLeyendo', () => {

        it('devuelve los libros con estado leyendo', async () => {
            const librosMock = [
                { id: 2, titulo: '1984', estado: EstadoLectura.Leyendo }
            ];
            (Libro.traerPorEstado as jest.Mock).mockResolvedValue(librosMock);

            const req = mockReq();
            const res = mockRes();
            const next = mockNext();

            await controller.obtenerLeyendo(req, res, next);

            expect(Libro.traerPorEstado).toHaveBeenCalledWith(EstadoLectura.Leyendo, 1);
            expect(res.json).toHaveBeenCalledWith(librosMock);
        });

    });

    describe('obtenerPorLeer', () => {

        it('devuelve los libros con estado por leer', async () => {
            const librosMock = [
                { id: 3, titulo: 'El Aleph', estado: EstadoLectura.PorLeer }
            ];
            (Libro.traerPorEstado as jest.Mock).mockResolvedValue(librosMock);

            const req = mockReq();
            const res = mockRes();
            const next = mockNext();

            await controller.obtenerPorLeer(req, res, next);

            expect(Libro.traerPorEstado).toHaveBeenCalledWith(EstadoLectura.PorLeer, 1);
            expect(res.json).toHaveBeenCalledWith(librosMock);
        });

    });

    describe('actualizarEstado', () => {

        it('devuelve el libro actualizado si todo es válido', async () => {
            const libroMock = { id: 1, titulo: 'Dune', estado: EstadoLectura.Leido };
            (Libro.actualizarLibro as jest.Mock).mockResolvedValue(libroMock);

            const req = mockReq({ id: '1' }, { estado: 'leido' });
            const res = mockRes();
            const next = mockNext();

            await controller.actualizarEstado(req, res, next);

            expect(res.json).toHaveBeenCalledWith(libroMock);
        });

        it('llama a next con error si el id no es un número', async () => {
            const req = mockReq({ id: 'abc' }, { estado: 'leido' });
            const res = mockRes();
            const next = mockNext();

            await controller.actualizarEstado(req, res, next);

            expect(next).toHaveBeenCalledWith(expect.any(Error));
        });

        it('llama a next con error si el estado no es válido', async () => {
            const req = mockReq({ id: '1' }, { estado: 'terminado' });
            const res = mockRes();
            const next = mockNext();

            await controller.actualizarEstado(req, res, next);

            expect(next).toHaveBeenCalledWith(expect.any(Error));
        });

        it('llama a next con error 404 si el libro no existe', async () => {
            (Libro.actualizarLibro as jest.Mock).mockResolvedValue(null);

            const req = mockReq({ id: '999' }, { estado: 'leido' });
            const res = mockRes();
            const next = mockNext();

            await controller.actualizarEstado(req, res, next);

            expect(next).toHaveBeenCalledWith(
                expect.objectContaining({ name: '404-Libros' })
            );
        });

    });

});
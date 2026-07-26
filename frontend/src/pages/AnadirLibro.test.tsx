import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { AnadirLibro } from './AnadirLibro';
import * as generoServiceModule from '../services/genero.service';
import * as librosServiceModule from '../services/libro.service';

// Mockea useNavigate
vi.mock('react-router-dom', () => ({
    useNavigate: () => vi.fn(),
}));

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

describe('AnadirLibro', () => {

    it('renderiza el formulario completo', async () => {
        vi.spyOn(generoServiceModule.generoService, 'obtenerGeneros')
            .mockResolvedValue([]);

        render(<AnadirLibro />);

        expect(screen.getByPlaceholderText('Ej. El Aleph')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Ej. Jorge Luis Borges')).toBeInTheDocument();
        expect(screen.getByPlaceholderText('Ej. 1949')).toBeInTheDocument();
        expect(screen.getByText('Guardar Libro')).toBeInTheDocument();
    });

    it('muestra error si se intenta guardar sin título', async () => {
        vi.spyOn(generoServiceModule.generoService, 'obtenerGeneros')
            .mockResolvedValue([]);

        render(<AnadirLibro />);

        fireEvent.click(screen.getByText('Guardar Libro'));

        await waitFor(() => {
            expect(screen.getByText('El título es obligatorio')).toBeInTheDocument();
        });
    });

    it('muestra error si se intenta guardar sin autor', async () => {
        vi.spyOn(generoServiceModule.generoService, 'obtenerGeneros')
            .mockResolvedValue([]);

        render(<AnadirLibro />);

        fireEvent.change(screen.getByPlaceholderText('Ej. El Aleph'), {
            target: { value: 'Dune' }
        });

        fireEvent.click(screen.getByText('Guardar Libro'));

        await waitFor(() => {
            expect(screen.getByText('El autor es obligatorio')).toBeInTheDocument();
        });
    });

    it('llama a crearLibro con los datos correctos', async () => {
        vi.spyOn(generoServiceModule.generoService, 'obtenerGeneros')
            .mockResolvedValue([]);

        const mockCrear = vi.spyOn(librosServiceModule.librosService, 'crearLibro')
            .mockResolvedValue({ id: 1, titulo: 'Dune', autor: 'Frank Herbert', anio: 1965, estado: 'por leer' });

        render(<AnadirLibro />);

        fireEvent.change(screen.getByPlaceholderText('Ej. El Aleph'), {
            target: { value: 'Dune' }
        });

        fireEvent.change(screen.getByPlaceholderText('Ej. Jorge Luis Borges'), {
            target: { value: 'Frank Herbert' }
        });

        fireEvent.click(screen.getByText('Guardar Libro'));

        await waitFor(() => {
            expect(mockCrear).toHaveBeenCalledWith(
                expect.objectContaining({
                    titulo: 'Dune',
                    autor: 'Frank Herbert',
                })
            );
        });
    });

    it('renderiza los botones de estado de lectura', async () => {
        vi.spyOn(generoServiceModule.generoService, 'obtenerGeneros')
            .mockResolvedValue([]);

        render(<AnadirLibro />);

        expect(screen.getByText('Por leer')).toBeInTheDocument();
        expect(screen.getByText('Leyendo')).toBeInTheDocument();
        expect(screen.getByText('Leído')).toBeInTheDocument();
    });

});
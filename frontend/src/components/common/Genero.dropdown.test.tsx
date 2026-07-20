import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { GeneroDropdown } from './Genero.dropdown';
import * as generoServiceModule from '../../services/genero.service';

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

describe('GeneroDropdown', () => {

    it('muestra el placeholder cuando no hay género seleccionado', async () => {
        vi.spyOn(generoServiceModule.generoService, 'obtenerGeneros')
            .mockResolvedValue([]);

        render(<GeneroDropdown generoId={undefined} onChange={() => {}} />);

        expect(screen.getByText('Seleccionar género...')).toBeInTheDocument();
    });

    it('muestra los géneros cargados desde el service', async () => {
        vi.spyOn(generoServiceModule.generoService, 'obtenerGeneros')
            .mockResolvedValue([
                { id: 1, nombre: 'Ficción' },
                { id: 2, nombre: 'Historia' },
            ]);

        render(<GeneroDropdown generoId={undefined} onChange={() => {}} />);

        await waitFor(() => {
            expect(screen.getByText('Ficción')).toBeInTheDocument();
            expect(screen.getByText('Historia')).toBeInTheDocument();
        });
    });

    it('llama a onChange con el id correcto al seleccionar un género', async () => {
        const mockOnChange = vi.fn();

        vi.spyOn(generoServiceModule.generoService, 'obtenerGeneros')
            .mockResolvedValue([
                { id: 1, nombre: 'Ficción' },
                { id: 2, nombre: 'Historia' },
            ]);

        render(<GeneroDropdown generoId={undefined} onChange={mockOnChange} />);

        await waitFor(() => {
            expect(screen.getByText('Ficción')).toBeInTheDocument();
        });

        fireEvent.change(screen.getByRole('combobox'), {
            target: { value: '1' }
        });

        expect(mockOnChange).toHaveBeenCalledWith(1);
    });

    it('muestra el género seleccionado correctamente', async () => {
        vi.spyOn(generoServiceModule.generoService, 'obtenerGeneros')
            .mockResolvedValue([
                { id: 1, nombre: 'Ficción' },
                { id: 2, nombre: 'Historia' },
            ]);

        render(<GeneroDropdown generoId={1} onChange={() => {}} />);

        await waitFor(() => {
            expect(screen.getByRole('combobox')).toHaveValue('1');
        });
    });

});
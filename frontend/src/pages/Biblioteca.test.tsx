import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup, waitFor } from '@testing-library/react';
import { Biblioteca } from './Biblioteca';
import * as librosServiceModule from '../services/libro.service';

// Mockea useNavigate y MainLayout
vi.mock('react-router-dom', () => ({
    useNavigate: () => vi.fn(),
}));

vi.mock('../components/layout/MainLayout', () => ({
    MainLayout: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
}));

vi.mock('../components/books/bookcard', () => ({
    default: ({ libro }: { libro: { titulo: string } }) => <div>{libro.titulo}</div>,
}));

afterEach(() => {
    cleanup();
    vi.restoreAllMocks();
});

const librosMock = [
    { id: 1, titulo: 'Dune', autor: 'Frank Herbert', anio: 1965, estado: 'por leer' as const },
    { id: 2, titulo: '1984', autor: 'George Orwell', anio: 1949, estado: 'leyendo' as const },
    { id: 3, titulo: 'El Aleph', autor: 'Borges', anio: 1949, estado: 'leido' as const },
];

describe('Biblioteca', () => {

    it('muestra "Cargando libros..." mientras carga', () => {
        vi.spyOn(librosServiceModule.librosService, 'getLibros')
            .mockResolvedValue([]);

        render(<Biblioteca />);

        expect(screen.getByText('Cargando libros...')).toBeInTheDocument();
    });

    it('muestra los libros después de cargar', async () => {
        vi.spyOn(librosServiceModule.librosService, 'getLibros')
            .mockResolvedValue(librosMock);

        render(<Biblioteca />);

        await waitFor(() => {
            expect(screen.getByText('Dune')).toBeInTheDocument();
            expect(screen.getByText('1984')).toBeInTheDocument();
            expect(screen.getByText('El Aleph')).toBeInTheDocument();
        });
    });

    it('muestra mensaje cuando no hay libros', async () => {
        vi.spyOn(librosServiceModule.librosService, 'getLibros')
            .mockResolvedValue([]);

        render(<Biblioteca />);

        await waitFor(() => {
            expect(screen.getByText('No hay libros en tu biblioteca.')).toBeInTheDocument();
        });
    });

    it('filtra libros por estado al hacer click en un filtro', async () => {
        vi.spyOn(librosServiceModule.librosService, 'getLibros')
            .mockResolvedValue(librosMock);

        render(<Biblioteca />);

        await waitFor(() => {
            expect(screen.getByText('Dune')).toBeInTheDocument();
        });

        fireEvent.click(screen.getByText('Leyendo'));

        await waitFor(() => {
            expect(screen.getByText('1984')).toBeInTheDocument();
            expect(screen.queryByText('Dune')).not.toBeInTheDocument();
            expect(screen.queryByText('El Aleph')).not.toBeInTheDocument();
        });
    });

    it('muestra la cantidad correcta de libros', async () => {
        vi.spyOn(librosServiceModule.librosService, 'getLibros')
            .mockResolvedValue(librosMock);

        render(<Biblioteca />);

        await waitFor(() => {
            expect(screen.getByText('3 libros en tu colección')).toBeInTheDocument();
        });
    });

    it('renderiza los 4 botones de filtro', async () => {
        vi.spyOn(librosServiceModule.librosService, 'getLibros')
            .mockResolvedValue([]);

        render(<Biblioteca />);

        await waitFor(() => {
            expect(screen.getByText('Todos')).toBeInTheDocument();
            expect(screen.getByText('Por leer')).toBeInTheDocument();
            expect(screen.getByText('Leyendo')).toBeInTheDocument();
            expect(screen.getByText('Leídos')).toBeInTheDocument();
        });
    });

});
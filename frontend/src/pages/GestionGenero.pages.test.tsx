import { cleanup, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { Genero } from '../types/Genero.type';
import { GestionGenero } from './GestionGenero.pages';
import { generoService } from '../services/genero.service';

interface GeneroAgregarMockProps {
  onClick: (genero: string) => void;
}

interface GeneroListaMockProps {
  generos: Genero[];
  onEditar: (id: number, nombre: string) => void;
  onBorrar: (id: number) => void;
}

interface ErrorMensajeMockProps {
  mensaje: string;
  onClose: (elementoConFoco: HTMLDivElement | null) => void;
}

vi.mock('../services/genero.service', () => ({
  generoService: {
    obtenerGeneros: vi.fn(),
    agregarGenero: vi.fn(),
    editarGenero: vi.fn(),
    borrarGenero: vi.fn(),
  },
}));

vi.mock('../components/common/Genero.titulo', () => ({
  GeneroTitulo: () => <h1>Gestión de géneros</h1>,
}));

vi.mock('../components/common/Genero.agregar', () => ({
  GeneroAgregar: ({ onClick }: GeneroAgregarMockProps) => (
    <div>
      <button onClick={() => onClick('Fantasía')}>Agregar Fantasía</button>
      <button onClick={() => onClick('Duplicado')}>Agregar duplicado</button>
    </div>
  ),
}));

vi.mock('../components/common/Genero.lista', () => ({
  GeneroLista: ({ generos, onEditar, onBorrar }: GeneroListaMockProps) => (
    <ul>
      {generos.map((genero) => (
        <li key={genero.id}>
          <span>{genero.nombre}</span>
          <button onClick={() => onEditar(genero.id, `${genero.nombre} editado`)}>
            Editar {genero.nombre}
          </button>
          <button onClick={() => onBorrar(genero.id)}>Borrar {genero.nombre}</button>
        </li>
      ))}
    </ul>
  ),
}));

vi.mock('../components/common/Error.mensaje', () => ({
  ErrorMensaje: ({ mensaje, onClose }: ErrorMensajeMockProps) => (
    <div role="alert">
      {mensaje}
      <button onClick={() => onClose(null)}>Cerrar error</button>
    </div>
  ),
}));

const generoInicial: Genero = { id: 1, nombre: 'Terror' };
const obtenerGeneros = vi.mocked(generoService.obtenerGeneros);
const agregarGenero = vi.mocked(generoService.agregarGenero);
const editarGenero = vi.mocked(generoService.editarGenero);
const borrarGenero = vi.mocked(generoService.borrarGenero);

describe('GestionGenero', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    obtenerGeneros.mockResolvedValue([generoInicial]);
    borrarGenero.mockResolvedValue();
  });

  afterEach(() => {
    cleanup();
  });

  it('carga y muestra los géneros al iniciar', async () => {
    render(<GestionGenero />);

    expect(await screen.findByText('Terror')).toBeInTheDocument();
    expect(obtenerGeneros).toHaveBeenCalledTimes(1);
  });

  it('agrega un género cuando el servicio responde exitosamente', async () => {
    agregarGenero.mockResolvedValue({ codigo: 201, mensaje: '', objeto: { id: 2, nombre: 'Fantasía' } });
    render(<GestionGenero />);

    await screen.findByText('Terror');
    fireEvent.click(screen.getByRole('button', { name: 'Agregar Fantasía' }));

    await waitFor(() => expect(agregarGenero).toHaveBeenCalledWith('Fantasía'));
    expect(await screen.findByText('Fantasía')).toBeInTheDocument();
  });

  it('actualiza el nombre cuando la edición es exitosa', async () => {
    editarGenero.mockResolvedValue({ codigo: 200, mensaje: 'OK' });
    render(<GestionGenero />);

    await screen.findByText('Terror');
    fireEvent.click(screen.getByRole('button', { name: 'Editar Terror' }));

    await waitFor(() => expect(editarGenero).toHaveBeenCalledWith(1, 'Terror editado'));
    expect(await screen.findByText('Terror editado')).toBeInTheDocument();
  });

  it('elimina un género cuando el servicio confirma la operación', async () => {
    render(<GestionGenero />);

    await screen.findByText('Terror');
    fireEvent.click(screen.getByRole('button', { name: 'Borrar Terror' }));

    await waitFor(() => expect(borrarGenero).toHaveBeenCalledWith(1));
    expect(screen.queryByText('Terror')).not.toBeInTheDocument();
  });

  it('muestra y cierra el mensaje de error cuando no se puede agregar', async () => {
    agregarGenero.mockResolvedValue({ codigo: 400, mensaje: 'El género ya existe' });
    render(<GestionGenero />);

    await screen.findByText('Terror');
    fireEvent.click(screen.getByRole('button', { name: 'Agregar duplicado' }));

    expect(await screen.findByRole('alert')).toHaveTextContent('El género ya existe');
    fireEvent.click(screen.getByRole('button', { name: 'Cerrar error' }));

    await waitFor(() => expect(screen.queryByRole('alert')).not.toBeInTheDocument());
  });
});

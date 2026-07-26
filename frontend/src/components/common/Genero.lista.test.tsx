import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import type { Genero } from '../../types/Genero.type';
import { GeneroLista } from './Genero.lista';

interface GeneroItemMockProps {
  genero: Genero;
  onEditar: () => void;
  onBorrar: () => void;
}

vi.mock('./GeneroItem.lista', () => ({
  GeneroItem: ({ genero, onEditar, onBorrar }: GeneroItemMockProps) => (
    <li>
      <span>{genero.nombre}</span>
      <button onClick={onEditar}>Editar {genero.nombre}</button>
      <button onClick={onBorrar}>Borrar {genero.nombre}</button>
    </li>
  ),
}));

const generos: Genero[] = [
  { id: 1, nombre: 'Fantasía' },
  { id: 2, nombre: 'Ciencia ficción' },
];

describe('GeneroLista', () => {
  afterEach(() => {
    cleanup();
  });

  it('muestra el encabezado, contador y géneros recibidos', () => {
    render(<GeneroLista generos={generos} onEditar={vi.fn()} onBorrar={vi.fn()} />);

    expect(screen.getByText('Géneros Existentes')).toBeInTheDocument();
    expect(screen.getByText('2 Generos Totales')).toBeInTheDocument();
    expect(screen.getByText('Fantasía')).toBeInTheDocument();
    expect(screen.getByText('Ciencia ficción')).toBeInTheDocument();
  });

  it('muestra el contador en cero cuando no hay géneros', () => {
    render(<GeneroLista generos={[]} onEditar={vi.fn()} onBorrar={vi.fn()} />);

    expect(screen.getByText('0 Generos Totales')).toBeInTheDocument();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
  });

  it('delega la edición y eliminación del género seleccionado', () => {
    const onEditar = vi.fn();
    const onBorrar = vi.fn();
    render(<GeneroLista generos={generos} onEditar={onEditar} onBorrar={onBorrar} />);

    fireEvent.click(screen.getByRole('button', { name: 'Editar Ciencia ficción' }));
    fireEvent.click(screen.getByRole('button', { name: 'Borrar Fantasía' }));

    expect(onEditar).toHaveBeenCalledWith(2, 'Ciencia ficción');
    expect(onBorrar).toHaveBeenCalledWith(1);
  });
});

import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { GeneroAgregar } from './Genero.agregar';

describe('GeneroAgregar', () => {
  afterEach(() => {
    cleanup();
  });

  it('muestra el formulario para agregar un género', () => {
    render(<GeneroAgregar onClick={vi.fn()} />);

    expect(screen.getByRole('heading', { name: 'Añadir Nuevo Genero' })).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toHaveValue('');
    expect(screen.getByRole('button', { name: 'Agregar' })).toBeInTheDocument();
  });

  it('envía el género ingresado y limpia el campo', () => {
    const onClick = vi.fn();
    render(<GeneroAgregar onClick={onClick} />);

    const campoGenero = screen.getByRole('textbox');
    fireEvent.change(campoGenero, { target: { value: 'Ciencia ficción' } });
    fireEvent.click(screen.getByRole('button', { name: 'Agregar' }));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith('Ciencia ficción');
    expect(campoGenero).toHaveValue('');
  });

  it('notifica un valor vacío al enviar el formulario sin contenido', () => {
    const onClick = vi.fn();
    render(<GeneroAgregar onClick={onClick} />);

    fireEvent.click(screen.getByRole('button', { name: 'Agregar' }));

    expect(onClick).toHaveBeenCalledWith('');
  });
});

import { fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { cleanup } from '@testing-library/react';
import { ErrorMensaje } from './Error.mensaje';

describe('ErrorMensaje', () => {
  afterEach(() => {
    cleanup();
  });

  it('muestra el mensaje y enfoca el contenido del diálogo', () => {
    render(<ErrorMensaje mensaje="No se pudo guardar el libro" onClose={vi.fn()} />);

    const mensaje = screen.getByText('No se pudo guardar el libro');
    const contenido = mensaje.parentElement?.parentElement;

    if (!contenido) {
      throw new Error('No se encontró el contenido del mensaje de error');
    }

    expect(screen.getByRole('heading', { name: 'Error' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cerrar' })).toBeInTheDocument();
    expect(contenido).toHaveFocus();
  });

  it('notifica el cierre con el elemento que tenía el foco', () => {
    const onClose = vi.fn();
    render(<ErrorMensaje mensaje="No se pudo guardar el libro" onClose={onClose} />);

    const mensaje = screen.getByText('No se pudo guardar el libro');
    const contenido = mensaje.parentElement?.parentElement;

    fireEvent.click(screen.getByRole('button', { name: 'Cerrar' }));

    expect(onClose).toHaveBeenCalledWith(contenido);
  });
});

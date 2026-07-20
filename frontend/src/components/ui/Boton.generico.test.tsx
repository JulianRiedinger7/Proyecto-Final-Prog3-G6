import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { BotonGenerico } from './Boton.generico';

describe('BotonGenerico', () => {
  afterEach(() => {
    cleanup();
  });

  it('muestra el texto y el ícono configurados', () => {
    const { container } = render(
      <BotonGenerico faLabel="fa-plus-circle" texto="Agregar" onClick={vi.fn()} />,
    );

    expect(screen.getByRole('button', { name: 'Agregar' })).toBeInTheDocument();
    expect(container.querySelector('.fa-plus-circle')).toBeInTheDocument();
  });

  it('ejecuta el callback al hacer clic', () => {
    const onClick = vi.fn();
    render(<BotonGenerico faLabel="fa-times-circle" texto="Cerrar" onClick={onClick} />);

    fireEvent.click(screen.getByRole('button', { name: 'Cerrar' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

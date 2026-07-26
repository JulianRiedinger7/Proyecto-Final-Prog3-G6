import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { BotonLista } from './Boton.lista';

describe('BotonLista', () => {
  afterEach(() => {
    cleanup();
  });

  it('muestra el ícono configurado', () => {
    const { container } = render(<BotonLista faLabel="fa-pen" onClick={vi.fn()} />);

    expect(screen.getByRole('button')).toHaveAttribute('type', 'button');
    expect(container.querySelector('.fa-pen')).toBeInTheDocument();
  });

  it('ejecuta el callback al hacer clic', () => {
    const onClick = vi.fn();
    render(<BotonLista faLabel="fa-trash" onClick={onClick} />);

    fireEvent.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

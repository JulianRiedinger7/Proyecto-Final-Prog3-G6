import { cleanup, render } from '@testing-library/react';
import { afterEach, describe, expect, it } from 'vitest';
import { IconoLista } from './Icono.lista';

describe('IconoLista', () => {
  afterEach(() => {
    cleanup();
  });

  it('muestra el ícono recibido dentro de su contenedor', () => {
    const { container } = render(<IconoLista faIcono="fa-bookmark" />);

    expect(container.firstElementChild).toHaveClass('rounded-full');
    expect(container.querySelector('.fa-solid.fa-bookmark')).toBeInTheDocument();
  });
});

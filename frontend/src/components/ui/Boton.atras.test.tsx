import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { BotonAtras } from './Boton.atras';

const { navigateMock } = vi.hoisted(() => ({ navigateMock: vi.fn() }));

vi.mock('react-router-dom', () => ({
  useNavigate: () => navigateMock,
}));

describe('BotonAtras', () => {
  beforeEach(() => {
    navigateMock.mockReset();
  });

  afterEach(() => {
    cleanup();
  });

  it('muestra el botón con el ícono de regreso', () => {
    const { container } = render(<BotonAtras />);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(container.querySelector('.fa-arrow-left')).toBeInTheDocument();
  });

  it('navega a la página principal al hacer clic', () => {
    render(<BotonAtras />);

    fireEvent.click(screen.getByRole('button'));

    expect(navigateMock).toHaveBeenCalledWith('/');
  });
});

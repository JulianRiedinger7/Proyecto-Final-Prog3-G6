import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { AuthProvider } from '../context/AuthContext';
import { useAuth } from '../hooks/useAuth';
import * as authService from '../services/authService';

vi.mock('../services/authService');

// Componente mínimo para poder ejercitar useAuth dentro de un árbol renderizado
const ComponenteDePrueba = () => {
  const { usuario, token, login, logout } = useAuth();
  return (
    <div>
      <p data-testid="usuario">{usuario ? usuario.nombre : 'sin usuario'}</p>
      <p data-testid="token">{token ?? 'sin token'}</p>
      <button onClick={() => login('mail@test.com', '123456')}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('AuthContext', () => {
  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('inicia sin usuario ni token cuando no hay nada en localStorage', () => {
    render(
      <AuthProvider>
        <ComponenteDePrueba />
      </AuthProvider>
    );

    expect(screen.getByTestId('usuario').textContent).toBe('sin usuario');
    expect(screen.getByTestId('token').textContent).toBe('sin token');
  });

  it('recupera usuario y token desde localStorage al montar', () => {
    localStorage.setItem('token', 'token-guardado');
    localStorage.setItem(
      'usuario',
      JSON.stringify({ id: 1, nombre: 'Julieta', mail: 'julieta@mail.com' })
    );

    render(
      <AuthProvider>
        <ComponenteDePrueba />
      </AuthProvider>
    );

    expect(screen.getByTestId('usuario').textContent).toBe('Julieta');
    expect(screen.getByTestId('token').textContent).toBe('token-guardado');
  });

  it('login guarda el token y el usuario en localStorage y en el estado', async () => {
    const respuestaFake = {
      usuario: { id: 1, nombre: 'Julieta', mail: 'julieta@mail.com' },
      token: 'token-nuevo',
    };
    vi.mocked(authService.login).mockResolvedValueOnce(respuestaFake);

    render(
      <AuthProvider>
        <ComponenteDePrueba />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText('Login'));

    await waitFor(() => {
      expect(screen.getByTestId('usuario').textContent).toBe('Julieta');
    });

    expect(screen.getByTestId('token').textContent).toBe('token-nuevo');
    expect(localStorage.getItem('token')).toBe('token-nuevo');
    expect(JSON.parse(localStorage.getItem('usuario')!)).toEqual(respuestaFake.usuario);
  });

  it('logout limpia el usuario, el token y el localStorage', async () => {
    localStorage.setItem('token', 'token-existente');
    localStorage.setItem(
      'usuario',
      JSON.stringify({ id: 1, nombre: 'Julieta', mail: 'julieta@mail.com' })
    );

    render(
      <AuthProvider>
        <ComponenteDePrueba />
      </AuthProvider>
    );

    fireEvent.click(screen.getByText('Logout'));

    await waitFor(() => {
      expect(screen.getByTestId('usuario').textContent).toBe('sin usuario');
    });

    expect(screen.getByTestId('token').textContent).toBe('sin token');
    expect(localStorage.getItem('token')).toBeNull();
    expect(localStorage.getItem('usuario')).toBeNull();
  });
});
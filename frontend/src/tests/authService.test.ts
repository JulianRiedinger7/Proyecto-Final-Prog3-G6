import { describe, it, expect, vi } from 'vitest';
import api from '../services/api';
import { login, registrar } from '../services/authService';

vi.mock('../services/api');

describe('login', () => {
  it('devuelve el token y el usuario cuando las credenciales son correctas', async () => {
    const respuestaFake = {
      usuario: { id: 1, nombre: 'Julieta', mail: 'julieta@mail.com' },
      token: 'token-fake-123',
    };

    vi.mocked(api.post).mockResolvedValueOnce({ data: respuestaFake });

    const resultado = await login({ mail: 'julieta@mail.com', contrasenia: '123456' });

    expect(resultado).toEqual(respuestaFake);
    expect(api.post).toHaveBeenCalledWith('/usuarios/login', {
      mail: 'julieta@mail.com',
      contrasenia: '123456',
    });
  });

  it('propaga el error cuando las credenciales son inválidas', async () => {
    vi.mocked(api.post).mockRejectedValueOnce(new Error('Credenciales inválidas'));

    await expect(
      login({ mail: 'julieta@mail.com', contrasenia: 'incorrecta' })
    ).rejects.toThrow('Credenciales inválidas');
  });
});

describe('registrar', () => {
  it('devuelve el usuario creado', async () => {
    const usuarioFake = { id: 2, nombre: 'Nuevo Usuario', mail: 'nuevo@mail.com' };

    vi.mocked(api.post).mockResolvedValueOnce({ data: usuarioFake });

    const resultado = await registrar({
      nombre: 'Nuevo Usuario',
      mail: 'nuevo@mail.com',
      contrasenia: '123456',
    });

    expect(resultado).toEqual(usuarioFake);
    expect(api.post).toHaveBeenCalledWith('/usuarios/register', {
      nombre: 'Nuevo Usuario',
      mail: 'nuevo@mail.com',
      contrasenia: '123456',
    });
  });

  it('propaga el error cuando el mail ya está en uso', async () => {
    vi.mocked(api.post).mockRejectedValueOnce(new Error('Mail ya registrado'));

    await expect(
      registrar({ nombre: 'X', mail: 'repetido@mail.com', contrasenia: '123456' })
    ).rejects.toThrow('Mail ya registrado');
  });
});
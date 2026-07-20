import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { InputEdicion } from './InputEdicion.lista';

describe('InputEdicion', () => {
  afterEach(() => {
    cleanup();
  });

  it('muestra y enfoca el valor actual', () => {
    render(
      <InputEdicion valorActual="Drama" onChange={vi.fn()} onGuardar={vi.fn()} onCancelar={vi.fn()} />,
    );

    expect(screen.getByRole('textbox')).toHaveValue('Drama');
    expect(screen.getByRole('textbox')).toHaveFocus();
  });

  it('notifica los cambios ingresados', () => {
    const onChange = vi.fn();
    render(
      <InputEdicion valorActual="Drama" onChange={onChange} onGuardar={vi.fn()} onCancelar={vi.fn()} />,
    );

    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Terror' } });

    expect(onChange).toHaveBeenCalledWith('Terror');
  });

  it('guarda mediante el botón o la tecla Enter', () => {
    const onGuardar = vi.fn();
    render(
      <InputEdicion valorActual="Drama" onChange={vi.fn()} onGuardar={onGuardar} onCancelar={vi.fn()} />,
    );

    fireEvent.click(screen.getByTitle('Guardar'));
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Enter' });

    expect(onGuardar).toHaveBeenCalledTimes(2);
  });

  it('cancela mediante el botón o la tecla Escape', () => {
    const onCancelar = vi.fn();
    render(
      <InputEdicion valorActual="Drama" onChange={vi.fn()} onGuardar={vi.fn()} onCancelar={onCancelar} />,
    );

    fireEvent.click(screen.getByTitle('Cancelar'));
    fireEvent.keyDown(screen.getByRole('textbox'), { key: 'Escape' });

    expect(onCancelar).toHaveBeenCalledTimes(2);
  });
});

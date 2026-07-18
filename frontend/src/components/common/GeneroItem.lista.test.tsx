import { cleanup, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { GeneroItem } from './GeneroItem.lista';

interface BotonListaMockProps {
  faLabel: string;
  onClick: () => void;
}

interface InputEdicionMockProps {
  valorActual: string;
  onChange: (valor: string) => void;
  onGuardar: () => void;
  onCancelar: () => void;
}

vi.mock('../ui/Boton.lista', () => ({
  BotonLista: ({ faLabel, onClick }: BotonListaMockProps) => (
    <button aria-label={faLabel} onClick={onClick}>
      {faLabel}
    </button>
  ),
}));

vi.mock('../ui/Icono.lista', () => ({
  IconoLista: () => <span>Ícono</span>,
}));

vi.mock('../ui/InputEdicion.lista', () => ({
  InputEdicion: ({ valorActual, onChange, onGuardar, onCancelar }: InputEdicionMockProps) => (
    <div>
      <input
        aria-label="Nombre del género"
        value={valorActual}
        onChange={(event) => onChange(event.target.value)}
      />
      <button onClick={onGuardar}>Guardar</button>
      <button onClick={onCancelar}>Cancelar</button>
    </div>
  ),
}));

describe('GeneroItem', () => {
  const genero = { id: 3, nombre: 'Fantasía' };

  afterEach(() => {
    cleanup();
  });

  it('muestra el nombre del género en mayúsculas y sus acciones', () => {
    render(<GeneroItem genero={genero} onEditar={vi.fn()} onBorrar={vi.fn()} />);

    expect(screen.getByText('FANTASÍA')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'fa-pen' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'fa-trash' })).toBeInTheDocument();
  });

  it('notifica la eliminación del género', () => {
    const onBorrar = vi.fn();
    render(<GeneroItem genero={genero} onEditar={vi.fn()} onBorrar={onBorrar} />);

    fireEvent.click(screen.getByRole('button', { name: 'fa-trash' }));

    expect(onBorrar).toHaveBeenCalledWith(3);
  });

  it('edita el género usando un nombre sin espacios externos', () => {
    const onEditar = vi.fn();
    render(<GeneroItem genero={genero} onEditar={onEditar} onBorrar={vi.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: 'fa-pen' }));
    const campoEdicion = screen.getByRole('textbox', { name: 'Nombre del género' });
    fireEvent.change(campoEdicion, { target: { value: ' Ciencia ficción ' } });
    fireEvent.click(screen.getByRole('button', { name: 'Guardar' }));

    expect(onEditar).toHaveBeenCalledWith(3, 'Ciencia ficción');
    expect(screen.getByText('FANTASÍA')).toBeInTheDocument();
    expect(screen.queryByRole('textbox', { name: 'Nombre del género' })).not.toBeInTheDocument();
  });

  it('restaura el nombre original al cancelar la edición', () => {
    render(<GeneroItem genero={genero} onEditar={vi.fn()} onBorrar={vi.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: 'fa-pen' }));
    fireEvent.change(screen.getByRole('textbox', { name: 'Nombre del género' }), {
      target: { value: 'Terror' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Cancelar' }));

    expect(screen.getByText('FANTASÍA')).toBeInTheDocument();
  });

  it('no guarda un nombre compuesto únicamente por espacios', () => {
    const onEditar = vi.fn();
    render(<GeneroItem genero={genero} onEditar={onEditar} onBorrar={vi.fn()} />);

    fireEvent.click(screen.getByRole('button', { name: 'fa-pen' }));
    fireEvent.change(screen.getByRole('textbox', { name: 'Nombre del género' }), {
      target: { value: '   ' },
    });
    fireEvent.click(screen.getByRole('button', { name: 'Guardar' }));

    expect(onEditar).not.toHaveBeenCalled();
    expect(screen.getByRole('textbox', { name: 'Nombre del género' })).toBeInTheDocument();
  });
});

import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, fireEvent, cleanup } from '@testing-library/react';
import { EstadoSelector } from './Estado.selector';

afterEach(() => {
    cleanup();
});

describe('EstadoSelector', () => {

    it('renderiza los 3 botones de estado', () => {
        render(
            <EstadoSelector 
                estadoActual="por leer" 
                onChange={() => {}} 
            />
        );

        expect(screen.getByText('Por leer')).toBeInTheDocument();
        expect(screen.getByText('Leyendo')).toBeInTheDocument();
        expect(screen.getByText('Leído')).toBeInTheDocument();
    });

    it('el botón activo es el que corresponde al estadoActual', () => {
        render(
            <EstadoSelector 
                estadoActual="leyendo" 
                onChange={() => {}} 
            />
        );

        const botonActivo = screen.getByText('Leyendo');
        expect(botonActivo).toHaveClass('bg-primary');
    });

    it('llama a onChange con el estado correcto al hacer click', () => {
        const mockOnChange = vi.fn();
        
        render(
            <EstadoSelector 
                estadoActual="por leer" 
                onChange={mockOnChange} 
            />
        );

        fireEvent.click(screen.getByText('Leído'));
        expect(mockOnChange).toHaveBeenCalledWith('leido');
    });

    it('cambia el estado activo al hacer click en otro botón', () => {
        const mockOnChange = vi.fn();
        
        render(
            <EstadoSelector 
                estadoActual="por leer" 
                onChange={mockOnChange} 
            />
        );

        fireEvent.click(screen.getByText('Leyendo'));
        expect(mockOnChange).toHaveBeenCalledWith('leyendo');
        
        fireEvent.click(screen.getByText('Leído'));
        expect(mockOnChange).toHaveBeenCalledWith('leido');
    });

});
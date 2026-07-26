import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { librosService } from "../services/libro.service";
import { type Libro } from "../types/Libro.type";
import { EstadoSelector } from "../components/common/Estado.selector";
import { GeneroDropdown } from "../components/common/Genero.dropdown";

export function AnadirLibro() {
    const navigate = useNavigate();

    const [form, setForm] = useState<Omit<Libro, 'id'>>({
        titulo: '',
        autor: '',
        anio: new Date().getFullYear(),
        portada: '',
        estado: 'por leer',
        generoId: undefined,
    });

    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleChange = (campo: keyof typeof form, valor: string | number) => {
        setForm({ ...form, [campo]: valor });
    };

    const handleGuardar = async () => {
        
        if (!form.titulo.trim()) {
            setError('El título es obligatorio');
            return;
        }
        if (!form.autor.trim()) {
            setError('El autor es obligatorio');
            return;
        }

        try {
            setCargando(true);
            setError(null);
            await librosService.crearLibro(form);
            navigate('/biblioteca');
        } catch {
            setError('Error al guardar el libro');
        } finally {
            setCargando(false);
        }
    };

    return (
        
        <div className="py-8 px-4">

            <button
                onClick={() => navigate('/biblioteca')}
                className="text-primary text-sm mb-6 flex items-center gap-1 hover:underline"
            >
                ← Volver a Biblioteca
            </button>

            <div className="max-w-xl mx-auto">
            <h1 className="font-serif text-3xl font-bold text-text mb-1">
                Añadir Libro
            </h1>
            <p className="text-text-light text-sm mb-8">
                Ingresa los detalles para agregar una nueva obra en tu colección.
            </p>

            {/* Formulario */}
            <div className="bg-blanco rounded-xl shadow p-6 flex flex-col gap-5">

                {/* Título */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-text">Título</label>
                    <input
                        type="text"
                        placeholder="Ej. El Aleph"
                        value={form.titulo}
                        onChange={(e) => handleChange('titulo', e.target.value)}
                        className="h-10 px-3 rounded-lg border border-border bg-secondary text-text text-sm"
                    />
                </div>

                {/* Autor */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-text">Autor</label>
                    <input
                        type="text"
                        placeholder="Ej. Jorge Luis Borges"
                        value={form.autor}
                        onChange={(e) => handleChange('autor', e.target.value)}
                        className="h-10 px-3 rounded-lg border border-border bg-secondary text-text text-sm"
                    />
                </div>

                {/* Año y Género */}
                <div className="flex gap-4">
                    <div className="flex flex-col gap-1 flex-1">
                        <label className="text-sm font-medium text-text">Año de publicación</label>
                        <input
                            type="number"
                            placeholder="Ej. 1949"
                            value={form.anio}
                            onChange={(e) => handleChange('anio', Number(e.target.value))}
                            className="h-10 px-3 rounded-lg border border-border bg-secondary text-text text-sm"
                        />
                    </div>
                    <div className="flex flex-col gap-1 flex-1">
                        <label className="text-sm font-medium text-text">Género</label>
                        <GeneroDropdown
                            generoId={form.generoId}
                            onChange={(id) => handleChange('generoId', id)}
                        />
                    </div>
                </div>

                {/* URL Portada */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-text">URL de la Portada</label>
                    <input
                        type="text"
                        placeholder="https://ejemplo.com/portada.jpg"
                        value={form.portada}
                        onChange={(e) => handleChange('portada', e.target.value)}
                        className="h-10 px-3 rounded-lg border border-border bg-secondary text-text text-sm"
                    />
                </div>

                {/* Estado de lectura */}
                <div className="flex flex-col gap-1">
                    <label className="text-sm font-medium text-text">Estado de Lectura</label>
                    <EstadoSelector
                        estadoActual={form.estado}
                        onChange={(estado) => handleChange('estado', estado)}
                    />
                </div>
                
                {/* Error */}
                {error && (
                    <p className="text-red-500 text-sm">{error}</p>
                )}

                {/* Botón guardar */}
                <button
                    onClick={handleGuardar}
                    disabled={cargando}
                    className="w-full h-12 bg-primary text-blanco rounded-lg font-medium hover:bg-primary-hover transition-colors disabled:opacity-50 cursor-pointer"
                >
                    {cargando ? 'Guardando...' : 'Guardar Libro'}
                </button>

            </div>
        </div>
        </div>
        
    );
}

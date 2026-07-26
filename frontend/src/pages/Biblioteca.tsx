import { useEffect, useState } from "react";
import {BookCard} from "../components/common/bookCard";
import { librosService } from "../services/libro.service";
import { type Libro } from "../types/Libro.type";
import { useNavigate } from "react-router-dom";


type Filtro = 'todos' | 'por leer' | 'leyendo' | 'leido';

export function Biblioteca() {
    const [libros, setLibros] = useState<Libro[]>([]);
    const [filtro, setFiltro] = useState<Filtro>('todos');
    const [cargando, setCargando] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const cargar = async () => {
            try {
                setCargando(true);
                const datos = await librosService.getLibros();
                setLibros(datos);
            } catch {
                console.error('Error al cargar libros');
            } finally {
                setCargando(false);
            }
        };
        cargar();
    }, []);

    const librosFiltrados = filtro === 'todos'
        ? libros
        : libros.filter(libro => libro.estado === filtro);

    const filtros: { valor: Filtro; etiqueta: string }[] = [
        { valor: 'todos', etiqueta: 'Todos' },
        { valor: 'por leer', etiqueta: 'Por leer' },
        { valor: 'leyendo', etiqueta: 'Leyendo' },
        { valor: 'leido', etiqueta: 'Leídos' },
    ];

    return (
        <div className="p-6">

            <div className="flex justify-between items-center mb-6">
                <div>
                    <h1 className="font-serif text-3xl font-bold text-text">
                        Mi Biblioteca
                    </h1>
                    <p className="text-text-light text-sm mt-1">
                        {libros.length} libros en tu colección
                    </p>
                </div>
                <button
                    onClick={() => navigate('/anadir')}
                    className="bg-primary text-blanco px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-hover transition-colors cursor-pointer"
                >
                    + Añadir Libro
                </button>
            </div>

            <div className="flex gap-2 mb-6">
                {filtros.map(({ valor, etiqueta }) => (
                    <button
                        key={valor}
                        onClick={() => setFiltro(valor)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors cursor-pointer
                            ${filtro === valor
                                ? 'bg-primary text-blanco'
                                : 'bg-blanco text-text-light border border-border hover:border-primary'
                            }`}
                    >
                        {etiqueta}
                    </button>
                ))}
            </div>

            {cargando ? (
                <p className="text-text-light">Cargando libros...</p>
            ) : librosFiltrados.length === 0 ? (
                <p className="text-text-light">
                    No hay libros {filtro !== 'todos' ? `en estado "${filtro}"` : 'en tu biblioteca'}.
                </p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {librosFiltrados.map(libro => (
                        <div
                            key={libro.id}
                            onClick={() => navigate(`/libros/${libro.id}`)}
                            className="cursor-pointer"
                        >
                            <BookCard libro={libro} />
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
}
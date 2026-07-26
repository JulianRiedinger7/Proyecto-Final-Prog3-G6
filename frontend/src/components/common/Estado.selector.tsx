import { type Libro } from '../../types/Libro.type';

type EstadoLectura = Libro['estado'];

interface EstadoSelectorProps {
    estadoActual: EstadoLectura;
    onChange: (estado: EstadoLectura) => void;
}

export function EstadoSelector({ estadoActual, onChange }: EstadoSelectorProps) {
    const estados: { valor: EstadoLectura; etiqueta: string }[] = [
        { valor: 'por leer', etiqueta: 'Por leer' },
        { valor: 'leyendo', etiqueta: 'Leyendo' },
        { valor: 'leido', etiqueta: 'Leído' },
    ];

    return (
        <div className="flex gap-2">
            {estados.map(({ valor, etiqueta }) => (
                <button
                    key={valor}
                    onClick={() => onChange(valor)}
                    className={`px-4 py-2 rounded-lg border text-sm font-medium cursor-pointer transition-colors
                        ${estadoActual === valor
                            ? 'bg-primary text-blanco border-primary'
                            : 'bg-blanco text-gray-600 border-gray-300 hover:border-primary'
                        }`}
                >
                    {etiqueta}
                </button>
            ))}
        </div>
    );
}

import { useEffect, useState } from "react";
import { type Genero } from "../../types/Genero.type";
import { generoService } from "../../services/genero.service";

interface GeneroDropdownProps {
    generoId: number | undefined;
    onChange: (generoId: number) => void;
}

export function GeneroDropdown({ generoId, onChange }: GeneroDropdownProps) {
    const [generos, setGeneros] = useState<Genero[]>([]);

    useEffect(() => {
        const cargar = async () => {
            const datos = await generoService.obtenerGeneros();
            setGeneros(datos);
        };
        cargar();
    }, []);

    return (
        <select
            value={generoId ?? ''}
            onChange={(e) => onChange(Number(e.target.value))}
            className="w-full h-10 px-3 rounded-lg border border-border bg-blanco text-text text-sm cursor-pointer"
        >
            <option value="" disabled>Seleccionar género...</option>
            {generos.map((genero) => (
                <option key={genero.id} value={genero.id}>
                    {genero.nombre}
                </option>
            ))}
        </select>
    );
}

import React from "react"
import type { Genero } from "../../types/Genero.type"
import { GeneroItem } from "./GeneroItem.lista";

interface GeneroListaProps {
    generos: Genero[];
    onEditar: (id: number, nuevoNombre: string) => void;
    onBorrar: (id:number) => void;
}

export function GeneroLista({ generos, onEditar, onBorrar }: GeneroListaProps) {
    return (
        <div className="rounded-xl bg-secondary shadow-2xl border overflow-hidden">
            <div className="px-6 py-4 flex justify-between items-center">
                <span className="font-sans text-xs font-semibold uppercase">
                    Géneros Existentes
                </span>
                <span className="font-sans text-xs bg-secondary font-semibold px-3 py-1 rounded-full">
                    {generos.length} Generos Totales
                </span>
            </div>
            <ul>
                {generos.map((g) => (
                    <GeneroItem key={g.id} genero={g} onEditar={() => onEditar(g.id, g.nombre)} onBorrar={() => onBorrar(g.id)}/>
                ))}
            </ul>
            <div className="px-6 py-4 border-t text-center">
            </div>
        </div>
    )
}
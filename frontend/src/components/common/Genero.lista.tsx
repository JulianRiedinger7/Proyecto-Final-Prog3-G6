import React from "react"
import type { Genero } from "../../types/Genero.type"
import { GeneroItem } from "./Genero.item";

interface GeneroListaProps {
    generos: Genero[];
    onEditar: (id: number, nuevoNombre: string) => void;
    onBorrar: (id:number) => void;
}

export function GeneroLista({ generos, onEditar, onBorrar }: GeneroListaProps) {
    return (
        <div className="rounded-xl border overflow-hidden">
            <div className="px-6 py-4 border-b border-surface-container flex justify-between items-center bg-surface-bright">
                <span className="font-sans text-xs font-semibold uppercase">
                    Géneros Existentes
                </span>
                <span className="font-sans text-xs font-semibold px-3 py-1 rounded-full">
                    {generos.length} Generos Totales
                </span>
            </div>
            <ul>
                {generos.map((g) => (
                    <GeneroItem genero={g} onEditar={onEditar} onBorrar={onBorrar}/>
                ))}
            </ul>
            <div className="px-6 py-4 border-t text-center">
            </div>
        </div>
    )
}
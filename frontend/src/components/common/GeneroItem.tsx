import React, { type ReactNode } from 'react';
import type { Genero } from '../../types/Genero.type';

interface GeneroItemProps {
    genero: Genero;
    icono: ReactNode;    
}

export const GeneroItem = ({ genero, icono }: GeneroItemProps ) => {
    return (
       <li className="flex items-center justify-between px-6 py-4 bg-primary text-blanco hover:bg-primary-hover hover:text-text-light">
        <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-full bg-secondary/30 flex items-center justify-center">
                <span className={`fa-solid ${icono} text-sm`}></span>
            </div>
            <div className="flex items-baseline gap-2 min-w-0">
                <span className="font-sans text-sm text-on-surface font-bold font-sans truncate">
                    {genero.nombre.toUpperCase()}
                </span>
            </div>
        </div>
        <div className="flex items-center gap-2">
            <button type="button" className="p-2 hover:text-blanco rounded-full cursor-pointer">
                <i className="fa-solid fa-pen text-[16px]"></i>
            </button>
            <button className="p-2 rounded-full hover:text-blanco cursor-pointer">          
                <i className="fa-solid fa-trash text-[16px]"></i>
            </button>
        </div>
       </li>
    )
}
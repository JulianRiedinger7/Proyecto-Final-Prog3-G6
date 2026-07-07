import { useState } from 'react';
import type { Genero } from '../../types/Genero.type';
import { BotonLista } from '../ui/boton.lista';

// Definicion de Props
interface GeneroItemProps {
    genero: Genero;   
    onEditar: (id: number, nuevoNombre: string) => void; 
    onBorrar: (id: number) => void;
}

// Espera de entrada el Genero para visualizar y el icono (Docs: https://fontawesome.com)
export const GeneroItem = ({ genero, onEditar, onBorrar }: GeneroItemProps ) => {
    const [editando, setEdicion] = useState(false);
    const [generoEdicion, setGenero] = useState(genero.nombre);

    const guardarManejador = () => {
        if ( generoEdicion.trim() ) {
            onEditar(genero.id, generoEdicion.trim());
            setEdicion(false);
            setGenero(generoEdicion.trim());
        }
    }

    const cancelarEdicion = () => {
        setEdicion(false);
        setGenero(genero.nombre);
    }

    return (
       <li className="flex items-center justify-between px-6 py-4 bg-primary text-blanco hover:bg-primary-hover hover:text-text-light">
        <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className="w-10 h-10 rounded-full bg-secondary/30 flex items-center justify-center">
                <span className={`fa-solid fa-book text-sm`}></span>
            </div>
            {editando?(
                <div className="flex items-center gap-2 flex-1 max-w-md">
                <input type="text" value={generoEdicion} onChange={(e) => setGenero(e.target.value)} onKeyDown={(e) => { if (e.key === 'Enter') guardarManejador(); if (e.key === 'Escape') cancelarEdicion();
                }} className="w-full bg-blanco border border-primary font-sans text-sm rounded px-3 py-1.5 focus:outline-none" autoFocus/>
            <button onClick={guardarManejador} className="p-1.5 bg-primary text-blanco rounded hover:bg-primary cursor-pointer flex items-center" title="Guardar">
                <i className="fa-solid fa-check text-sm"></i>
            </button>
            <button onClick={cancelarEdicion} className="p-1.5 rounded cursor-pointer flex items-center" title="Cancelar">
                <i className="fa-solid fa-xmark text-sm"></i>
            </button>
            </div>):
            (<div className="flex items-baseline gap-2 min-w-0">
                <span className="font-sans text-sm text-on-surface font-bold font-sans truncate">
                    {genero.nombre.toUpperCase()}
                </span>
            </div>)}
        </div>
        {!editando &&
        (<div className="flex items-center gap-2">
            <BotonLista faLabel="fa-pen" onClick = { () => {
                setEdicion(true);
                setGenero(genero.nombre);
            }}/>               
           <BotonLista faLabel="fa-trash" onClick={()=> {
                onBorrar(genero.id);
                }
            }/>                        
        </div>)}
       </li>
    )
}
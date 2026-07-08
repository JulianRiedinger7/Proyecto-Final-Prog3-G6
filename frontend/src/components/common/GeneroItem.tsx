import { useState } from 'react';
import type { Genero } from '../../types/Genero.type';
import { BotonLista } from '../ui/boton.lista';
import { IconoLista } from '../ui/Icono.lista';
import { InputEdicion } from '../ui/InputEdicion.lista';

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
           <IconoLista faIcono="fa-book"/>
           {editando? // Si se habilito la edicion muestro el input
                (<InputEdicion valorActual={generoEdicion} onChange={setGenero} onGuardar={guardarManejador} onCancelar={cancelarEdicion}/>)
                :(<div className="flex items-baseline gap-2 min-w-0">
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
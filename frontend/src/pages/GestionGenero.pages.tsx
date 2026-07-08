import { GeneroAgregar } from "../components/common/Genero.agregar";
import { GeneroLista } from "../components/common/Genero.lista";
import { GeneroTitulo } from "../components/common/Genero.titulo";



export function GestionGenero () {
    return (
        <div className="flex flex-col w-min gap-10 bg-secondary">
            <div>
                <GeneroTitulo/>
            </div>
            <div>
                <GeneroAgregar onClick={()=>{}} genero=""/>
            </div>
            <div>
                <GeneroLista generos={[{id:1, nombre:"Uno"}, {id:2, nombre:"Dos"}]} onBorrar={()=>{}} onEditar={() => {}}/>
            </div>
        </div>
    );
}
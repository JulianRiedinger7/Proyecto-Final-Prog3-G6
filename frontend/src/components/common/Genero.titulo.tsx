import { BotonAtras } from "../ui/Boton.atras";

export function GeneroTitulo () {
    return(
        <div className="flex">
            <div className="flex h-4 m-6 items-center">
                <BotonAtras/>
            </div>
            <div>
                <h1 className="font-extrabold text-3xl font-serif">Gestión de generos</h1>
                <p className="text-sm">Organiza las categorias de los libros</p>
            </div>
        </div>
    );
}
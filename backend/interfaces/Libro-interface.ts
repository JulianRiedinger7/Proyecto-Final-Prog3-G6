// Declaro Enum con los estados posibles de la lectura del libro
export enum EstadoLectura  { PorLeer = "por leer", Leyendo = "leyendo", Leido = "leido" }

export interface InterfaceLibro {
    id?: number,
    titulo: string,
    autor: string,
    anio: number,
    portada?: string,
    estado?: EstadoLectura,
    puntaje?: number,
    resenia?: string,
    generoId?: number,
    usuarioId?: number
}

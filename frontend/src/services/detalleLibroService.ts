export async function obtenerLibro(id: number): Promise<Libro> {
  const respuesta = await fetch(`http://localhost:3000/api/libros/${id}`);

  if (!respuesta.ok) {
    throw new Error("No se pudo obtener el libro");
  }
  return await respuesta.json();
}

export interface Libro {
  id:number;
  titulo: string;
  autor: string;
  anio: number;
  portada: string;
  estado: string;  
  puntaje: number;
  generoId: number;
  resenia: string; 
}

export async function actualizarResenia(id: number, resenia: string, puntaje: number): Promise<Libro> {
  const respuesta = await fetch(`http://localhost:3000/api/libros/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resenia, puntaje }),
  });

  if (!respuesta.ok) {
    throw new Error("No se pudo actualizar la reseña");
  }

  return await respuesta.json();
}
export async function obtenerLibro(id: number) {
  const respuesta = await fetch(`http://localhost:3000/api/libros/${id}`);

  if (!respuesta.ok) {
    throw new Error("No se pudo obtener el libro");
  }
  return await respuesta.json();
}
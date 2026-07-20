type PortadaSize = "S" | "M" | "L";

export const getPortadaUrl = (portada: string | undefined, tamanio: PortadaSize): string => {
  if (!portada) return "/book-cover-placeholder.png";
  const idPortada = portada?.replace("OL", "");

  return `https://covers.openlibrary.org/b/id/${idPortada}-${tamanio}.jpg`;
};

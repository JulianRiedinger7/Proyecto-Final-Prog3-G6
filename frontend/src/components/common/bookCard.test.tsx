import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Libro } from "../../types/Libro.type";
import { BookCard } from "./bookCard";

vi.mock("../CalificacionStars", () => ({
  default: ({ puntaje }: { puntaje: number }) => <div data-testid="calificacion">{puntaje}</div>,
}));

const libroMock: Libro = {
  id: 1,
  titulo: "El Hobbit",
  autor: "J.R.R. Tolkien",
  anio: 1937,
  estado: "leyendo",
  puntaje: 4,
  portada: "OL12345",
  categoria: { id: 1, nombre: "Fantasía" },
};

describe("BookCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubEnv("VITE_API_URL", "http://localhost:3001");
  });

  afterEach(() => {
    vi.unstubAllEnvs();
    cleanup();
  });

  it("renderiza la información del libro y la portada con la URL del backend", () => {
    render(<BookCard libro={libroMock} />);

    const imagen = screen.getByAltText("El Hobbit");

    expect(imagen).toBeInTheDocument();
    expect(imagen).toHaveAttribute("src", "http://localhost:3001/libros/portada/OL12345");
    expect(screen.getByText("Fantasía")).toBeInTheDocument();
    expect(screen.getByText("El Hobbit")).toBeInTheDocument();
    expect(screen.getByText("J.R.R. Tolkien")).toBeInTheDocument();
    expect(screen.getByText("leyendo")).toBeInTheDocument();
    expect(screen.getByTestId("calificacion")).toHaveTextContent("4");
  });

  it("usa el placeholder cuando no hay portada", () => {
    render(<BookCard libro={{ ...libroMock, portada: undefined }} />);

    expect(screen.getByAltText("El Hobbit")).toHaveAttribute("src", "/book-cover-placeholder.png");
  });
});

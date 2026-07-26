import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Libro } from "../../types/Libro.type";
import { BookCard } from "./bookCard";
import { getPortadaUrl } from "../../utils/getPortada.util";

vi.mock("../../utils/getPortada.util", () => ({
  getPortadaUrl: vi.fn(),
}));

vi.mock("../CalificacionStars", () => ({
  default: ({ puntaje }: { puntaje: number }) => <div data-testid="calificacion">{puntaje}</div>,
}));

const getPortadaUrlMock = vi.mocked(getPortadaUrl);

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
    getPortadaUrlMock.mockReturnValue("https://mocked-cover.com/portada.jpg");
  });

  afterEach(() => {
    cleanup();
  });

  it("renderiza la información del libro y su portada", () => {
    render(<BookCard libro={libroMock} />);

    expect(screen.getByAltText("El Hobbit")).toBeInTheDocument();
    expect(screen.getByText("Fantasía")).toBeInTheDocument();
    expect(screen.getByText("El Hobbit")).toBeInTheDocument();
    expect(screen.getByText("J.R.R. Tolkien")).toBeInTheDocument();
    expect(screen.getByText("leyendo")).toBeInTheDocument();
    expect(screen.getByTestId("calificacion")).toHaveTextContent("4");
    expect(getPortadaUrl).toHaveBeenCalledWith("OL12345", "M");
  });

  it("cambia la imagen a un placeholder cuando la portada falla", () => {
    render(<BookCard libro={libroMock} />);

    const imagen = screen.getByAltText("El Hobbit");
    fireEvent.error(imagen);

    expect(imagen).toHaveAttribute("src", "/book-cover-placeholder.png");
  });
});

import { cleanup, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Libro } from "../types/Libro.type";
import { MejorCalificadosPage } from "./mejorCalificados.page";
import { obtenerLibrosMejorCalificados } from "../services/estadisticas.service";

interface BookCardMockProps {
  libro: Libro;
}

vi.mock("../services/estadisticas.service", () => ({
  obtenerLibrosMejorCalificados: vi.fn(),
}));

vi.mock("../components/common/bookCard", () => ({
  BookCard: ({ libro }: BookCardMockProps) => <div>{libro.titulo}</div>,
}));

vi.mock("../components/ui/Boton.atras", () => ({
  BotonAtras: () => <button type="button">Volver</button>,
}));

const obtenerLibrosMejorCalificadosMock = vi.mocked(obtenerLibrosMejorCalificados);

const librosMock: Libro[] = [
  {
    id: 1,
    titulo: "Cien años de soledad",
    autor: "Gabriel García Márquez",
    anio: 1967,
    estado: "leido",
    categoria: { id: 1, nombre: "Realismo mágico" },
  },
  {
    id: 2,
    titulo: "1984",
    autor: "George Orwell",
    anio: 1949,
    estado: "leido",
    categoria: { id: 2, nombre: "Distopía" },
  },
];

describe("MejorCalificadosPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    obtenerLibrosMejorCalificadosMock.mockResolvedValue(librosMock);
  });

  afterEach(() => {
    cleanup();
  });

  it("carga y muestra los libros mejor calificados al iniciar", async () => {
    render(<MejorCalificadosPage />);

    expect(await screen.findByText("Mejor Calificados")).toBeInTheDocument();
    expect(await screen.findByText("Cien años de soledad")).toBeInTheDocument();
    expect(await screen.findByText("1984")).toBeInTheDocument();
    expect(obtenerLibrosMejorCalificados).toHaveBeenCalledTimes(1);
  });

  it("muestra un mensaje de carga inicial mientras no hay libros", async () => {
    obtenerLibrosMejorCalificadosMock.mockResolvedValue([]);
    render(<MejorCalificadosPage />);

    expect(screen.getByText("Cargando libros mejor calificados...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Cargando libros mejor calificados...")).toBeInTheDocument();
    });
  });
});

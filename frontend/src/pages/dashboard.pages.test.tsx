import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Estadisticas } from "../types/Estadisticas.type";
import type { Genero } from "../types/Genero.type";
import type { Libro } from "../types/Libro.type";
import { DashboardPage } from "./dashboard.page";
import { obtenerEstadisticas, obtenerLibrosLeyendo } from "../services/estadisticas.service";
import { generoService } from "../services/genero.service";

interface StatsCardMockProps {
  titulo: string;
  valor: number;
}

interface BookCardMockProps {
  libro: Libro;
}

interface GeneroPillMockProps {
  genero: Genero;
  activo: boolean;
  onClick: () => void;
}

vi.mock("../services/estadisticas.service", () => ({
  obtenerEstadisticas: vi.fn(),
  obtenerLibrosLeyendo: vi.fn(),
}));

vi.mock("../services/genero.service", () => ({
  generoService: {
    obtenerGeneros: vi.fn(),
  },
}));

vi.mock("../components/common/statsCard", () => ({
  StatsCard: ({ titulo, valor }: StatsCardMockProps) => (
    <div>
      {titulo}: {valor}
    </div>
  ),
}));

vi.mock("../components/common/bookCard", () => ({
  BookCard: ({ libro }: BookCardMockProps) => <div>{libro.titulo}</div>,
}));

vi.mock("../components/common/generoPill", () => ({
  GeneroPill: ({ genero, onClick }: GeneroPillMockProps) => (
    <button onClick={onClick}>{genero.nombre}</button>
  ),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");

  return {
    ...actual,
    Link: ({ to, children, ...props }: { to: string; children: ReactNode }) => (
      <a href={to} {...props}>
        {children}
      </a>
    ),
  };
});

const estadisticasMock: Estadisticas = {
  TotalLibros: 8,
  LibrosLeyendo: 3,
  LibrosLeidos: 5,
  LibrosPorLeer: 2,
  LeidoReciente: "2024-01-01",
  TerminadoReciente: "2024-01-02",
  UltimoIncorporad: "2024-01-03",
};

const generosMock: Genero[] = [
  { id: 1, nombre: "Fantasía" },
  { id: 2, nombre: "Terror" },
];

const librosMock: Libro[] = [
  {
    id: 1,
    titulo: "El Hobbit",
    autor: "J.R.R. Tolkien",
    anio: 1937,
    estado: "leyendo",
    categoria: { id: 1, nombre: "Fantasía" },
  },
  {
    id: 2,
    titulo: "La Sombra del Reino",
    autor: "Ana Pérez",
    anio: 2020,
    estado: "leyendo",
    categoria: { id: 2, nombre: "Terror" },
  },
];

const obtenerEstadisticasMock = vi.mocked(obtenerEstadisticas);
const obtenerLibrosLeyendoMock = vi.mocked(obtenerLibrosLeyendo);
const obtenerGenerosMock = vi.mocked(generoService.obtenerGeneros);

describe("DashboardPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    obtenerEstadisticasMock.mockResolvedValue(estadisticasMock);
    obtenerLibrosLeyendoMock.mockResolvedValue(librosMock);
    obtenerGenerosMock.mockResolvedValue(generosMock);
  });

  afterEach(() => {
    cleanup();
  });

  it("carga y muestra las estadísticas, libros y géneros al iniciar", async () => {
    render(<DashboardPage />);

    expect(await screen.findByText("Dashboard")).toBeInTheDocument();
    expect(await screen.findByText("Total Libros: 8")).toBeInTheDocument();
    expect(await screen.findByText("Leyendo: 3")).toBeInTheDocument();
    expect(await screen.findByText("Leidos: 5")).toBeInTheDocument();
    expect(await screen.findByText("Continuar Leyendo")).toBeInTheDocument();
    expect(await screen.findByText("El Hobbit")).toBeInTheDocument();
    expect(await screen.findByText("Fantasía")).toBeInTheDocument();

    expect(obtenerEstadisticas).toHaveBeenCalledTimes(1);
    expect(obtenerLibrosLeyendo).toHaveBeenCalledTimes(1);
    expect(generoService.obtenerGeneros).toHaveBeenCalledTimes(1);
  });

  it("filtra los libros al seleccionar un género", async () => {
    render(<DashboardPage />);

    await screen.findByText("El Hobbit");
    fireEvent.click(screen.getByRole("button", { name: "Terror" }));

    await waitFor(() => {
      expect(screen.queryByText("El Hobbit")).not.toBeInTheDocument();
    });
    expect(screen.getByText("La Sombra del Reino")).toBeInTheDocument();
  });

  it("muestra el mensaje cuando no hay libros en lectura", async () => {
    obtenerLibrosLeyendoMock.mockResolvedValue([]);
    render(<DashboardPage />);

    expect(await screen.findByText("No hay libros en lectura.")).toBeInTheDocument();
    expect(screen.queryByText("Continuar Leyendo")).not.toBeInTheDocument();
  });
});

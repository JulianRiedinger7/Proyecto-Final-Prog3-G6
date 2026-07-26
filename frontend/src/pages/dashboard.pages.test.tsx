import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Genero } from "../types/Genero.type";
import type { Libro } from "../types/Libro.type";
import { DashboardPage } from "./dashboard.page";
import { obtenerLibrosLeyendo } from "../services/estadisticas.service";
import { generoService } from "../services/genero.service";

interface BookCardMockProps {
  libro: Libro;
}

interface GeneroPillMockProps {
  genero: Genero;
  activo: boolean;
  onClick: () => void;
}

const { mockNavigate, useAuthMock } = vi.hoisted(() => ({
  mockNavigate: vi.fn(),
  useAuthMock: vi.fn(),
}));

vi.mock("../services/estadisticas.service", () => ({
  obtenerLibrosLeyendo: vi.fn(),
}));

vi.mock("../services/genero.service", () => ({
  generoService: {
    obtenerGeneros: vi.fn(),
  },
}));

vi.mock("../hooks/useAuth", () => ({
  useAuth: useAuthMock,
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
    useNavigate: () => mockNavigate,
  };
});

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

const obtenerLibrosLeyendoMock = vi.mocked(obtenerLibrosLeyendo);
const obtenerGenerosMock = vi.mocked(generoService.obtenerGeneros);

describe("DashboardPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAuthMock.mockReturnValue({ usuario: { id: 1, nombre: "Juan" } });
    obtenerLibrosLeyendoMock.mockResolvedValue(librosMock);
    obtenerGenerosMock.mockResolvedValue(generosMock);
  });

  afterEach(() => {
    cleanup();
  });

  it("carga y muestra los libros y géneros al iniciar", async () => {
    render(<DashboardPage />);

    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/Bienvenido de vuelta/i);
    expect(await screen.findByText("JUAN")).toBeInTheDocument();
    expect(await screen.findByText("Continuar Leyendo")).toBeInTheDocument();
    expect(await screen.findByText("Filtrar por género:")).toBeInTheDocument();
    expect(await screen.findByText("El Hobbit")).toBeInTheDocument();
    expect(await screen.findByText("Fantasía")).toBeInTheDocument();

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

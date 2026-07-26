import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import type { Genero } from "../../types/Genero.type";
import { GeneroPill } from "./generoPill";

const generoMock: Genero = {
  id: 1,
  nombre: "Fantasía",
};

describe("GeneroPill", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("renderiza el nombre del género y se ve inactivo por defecto", () => {
    render(<GeneroPill genero={generoMock} activo={false} onClick={vi.fn()} />);

    const boton = screen.getByRole("button", { name: "Fantasía" });
    expect(boton).toBeInTheDocument();
    expect(boton).toHaveClass("bg-gray-200");
  });

  it("llama al handler al hacer clic y se muestra como activo", () => {
    const onClick = vi.fn();
    render(<GeneroPill genero={generoMock} activo={true} onClick={onClick} />);

    const boton = screen.getByRole("button", { name: "Fantasía" });
    fireEvent.click(boton);

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(boton).toHaveClass("bg-primary");
  });
});

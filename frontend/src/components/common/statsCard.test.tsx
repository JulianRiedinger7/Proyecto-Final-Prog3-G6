import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { StatsCard } from "./statsCard";

describe("StatsCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  it("renderiza el título y el valor recibidos", () => {
    render(<StatsCard titulo="Total Libros" valor={42} />);

    expect(screen.getByText("Total Libros")).toBeInTheDocument();
    expect(screen.getByText("42")).toBeInTheDocument();
  });
});

import { afterEach, describe, expect, it, vi } from "vitest";

describe("api baseURL", () => {
  afterEach(() => {
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it("agrega el prefijo /api cuando VITE_API_URL no lo incluye", async () => {
    vi.stubEnv("VITE_API_URL", "http://localhost:3001");

    const { default: api } = await import("../services/api");

    expect(api.defaults.baseURL).toBe("http://localhost:3001/api");
  });
});

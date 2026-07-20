require("reflect-metadata");

const { Categoria } = require("./categoria.model");

describe("Categoria", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("trae todas las categorías", async () => {
    const categorias = [{ id: 1, nombre: "Fantasía" }];
    const findAll = jest.spyOn(Categoria, "findAll").mockResolvedValue(categorias);

    await expect(Categoria.traerTodas()).resolves.toBe(categorias);
    expect(findAll).toHaveBeenCalledTimes(1);
  });

  it("encuentra una categoría por id", async () => {
    const categoria = { id: 1, nombre: "Fantasía" };
    const findByPk = jest.spyOn(Categoria, "findByPk").mockResolvedValue(categoria);

    await expect(Categoria.encontrarPorId(1)).resolves.toBe(categoria);
    expect(findByPk).toHaveBeenCalledWith(1);
  });

  it("crea una categoría con los datos recibidos", async () => {
    const categoria = { nombre: "Terror" };
    const categoriaCreada = { id: 2, nombre: "Terror" };
    const create = jest.spyOn(Categoria, "create").mockResolvedValue(categoriaCreada);

    await expect(Categoria.crear(categoria)).resolves.toBe(categoriaCreada);
    expect(create).toHaveBeenCalledWith(categoria);
  });

  it("borrar una categoría existente y la devuelve", async () => {
    const categoriaExistente = { destroy: jest.fn().mockResolvedValue(undefined) };
    jest.spyOn(Categoria, "findByPk").mockResolvedValue(categoriaExistente);

    await expect(Categoria.borrar(1)).resolves.toBe(categoriaExistente);
    expect(categoriaExistente.destroy).toHaveBeenCalledTimes(1);
  });

  it("devuelve null al intentar borrar una categoría inexistente", async () => {
    jest.spyOn(Categoria, "findByPk").mockResolvedValue(null);

    await expect(Categoria.borrar(99)).resolves.toBeNull();
  });

  it("cuenta las categorías", async () => {
    const count = jest.spyOn(Categoria, "count").mockResolvedValue(3);

    await expect(Categoria.contar()).resolves.toBe(3);
    expect(count).toHaveBeenCalledTimes(1);
  });

  it("actualiza una categoría existente y la devuelve", async () => {
    const categoriaExistente = {
      update: jest.fn().mockResolvedValue(undefined),
      reload: jest.fn().mockResolvedValue(undefined),
    };
    jest.spyOn(Categoria, "findByPk").mockResolvedValue(categoriaExistente);

    await expect(Categoria.actualizarCategoria(1, { nombre: "Ciencia ficción" })).resolves.toBe(
      categoriaExistente,
    );
    expect(categoriaExistente.update).toHaveBeenCalledWith({ nombre: "Ciencia ficción" });
    expect(categoriaExistente.reload).toHaveBeenCalledTimes(1);
  });

  it("devuelve null al intentar actualizar una categoría inexistente", async () => {
    jest.spyOn(Categoria, "findByPk").mockResolvedValue(null);

    await expect(Categoria.actualizarCategoria(99, { nombre: "No existe" })).resolves.toBeNull();
  });
});

require("reflect-metadata");

const { Libro } = require("./libro.model");
const { Categoria } = require("./categoria.model");
const { Usuario } = require("./usuario.model");
const { EstadoLectura } = require("../interfaces/Libro.interface");

const libro = {
  titulo: "Cien años de soledad",
  autor: "Gabriel García Márquez",
  anio: 1967,
  estado: EstadoLectura.Leido,
  generoId: 2,
  usuarioId: 4,
};

describe("Libro", () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("obtiene un libro por id con su categoría y usuario", async () => {
    const libroEncontrado = { id: 1, ...libro };
    const findByPk = jest.spyOn(Libro, "findByPk").mockResolvedValue(libroEncontrado);

    await expect(Libro.encontrarPorId(1)).resolves.toBe(libroEncontrado);
    expect(findByPk).toHaveBeenCalledWith(1, {
      include: [
        { model: Categoria, attributes: ["id", "nombre"] },
        { model: Usuario, attributes: ["id", "nombre"] },
      ],
    });
  });

  it("lista solamente los libros del usuario solicitado", async () => {
    const libros = [{ id: 1, ...libro }];
    const findAll = jest.spyOn(Libro, "findAll").mockResolvedValue(libros);

    await expect(Libro.traerTodos(4)).resolves.toBe(libros);
    expect(findAll).toHaveBeenCalledWith({
      where: { usuarioId: 4 },
      include: [
        { model: Categoria, attributes: ["id", "nombre"] },
        { model: Usuario, attributes: ["id", "nombre"] },
      ],
    });
  });

  it("crea un libro con los datos recibidos", async () => {
    const libroCreado = { id: 1, ...libro };
    const create = jest.spyOn(Libro, "create").mockResolvedValue(libroCreado);

    await expect(Libro.crear(libro)).resolves.toBe(libroCreado);
    expect(create).toHaveBeenCalledWith(libro);
  });

  it("actualiza y recarga un libro existente", async () => {
    const libroExistente = {
      update: jest.fn().mockResolvedValue(undefined),
      reload: jest.fn().mockResolvedValue(undefined),
    };
    jest.spyOn(Libro, "findByPk").mockResolvedValue(libroExistente);

    await expect(Libro.actualizarLibro(1, { titulo: "El amor en los tiempos del cólera" }))
      .resolves.toBe(libroExistente);
    expect(libroExistente.update).toHaveBeenCalledWith({ titulo: "El amor en los tiempos del cólera" });
    expect(libroExistente.reload).toHaveBeenCalledTimes(1);
  });

  it("devuelve null al intentar actualizar un libro inexistente", async () => {
    jest.spyOn(Libro, "findByPk").mockResolvedValue(null);

    await expect(Libro.actualizarLibro(99, { titulo: "No existe" })).resolves.toBeNull();
  });

  it("elimina un libro existente y lo devuelve", async () => {
    const libroExistente = { destroy: jest.fn().mockResolvedValue(undefined) };
    jest.spyOn(Libro, "findByPk").mockResolvedValue(libroExistente);

    await expect(Libro.borrarPorId(1)).resolves.toBe(libroExistente);
    expect(libroExistente.destroy).toHaveBeenCalledTimes(1);
  });

  it("devuelve null al intentar eliminar un libro inexistente", async () => {
    jest.spyOn(Libro, "findByPk").mockResolvedValue(null);

    await expect(Libro.borrarPorId(99)).resolves.toBeNull();
  });

  it("cuenta libros aplicando el filtro de usuario", async () => {
    const count = jest.spyOn(Libro, "count").mockResolvedValue(3);

    await expect(Libro.contar(4)).resolves.toBe(3);
    expect(count).toHaveBeenCalledWith({ where: { usuarioId: 4 } });
  });

  it("obtiene la portada de un libro", async () => {
    const findByPk = jest.spyOn(Libro, "findByPk").mockResolvedValue({ portada: "portada.jpg" });

    await expect(Libro.getPortada(1)).resolves.toBe("portada.jpg");
    expect(findByPk).toHaveBeenCalledWith(1, { attributes: ["portada"], raw: true });
  });

  it("devuelve undefined cuando el libro no tiene portada", async () => {
    jest.spyOn(Libro, "findByPk").mockResolvedValue(null);

    await expect(Libro.getPortada(99)).resolves.toBeUndefined();
  });

  it("actualiza y recarga la reseña de un libro existente", async () => {
    const libroExistente = {
      update: jest.fn().mockResolvedValue(undefined),
      reload: jest.fn().mockResolvedValue(undefined),
    };
    jest.spyOn(Libro, "findByPk").mockResolvedValue(libroExistente);
    const resenia = { resenia: "Una obra imprescindible" };

    await expect(Libro.actualizarResenia(1, resenia)).resolves.toBe(libroExistente);
    expect(libroExistente.update).toHaveBeenCalledWith(resenia);
    expect(libroExistente.reload).toHaveBeenCalledTimes(1);
  });

  it("filtra libros por estado y usuario", async () => {
    const findAll = jest.spyOn(Libro, "findAll").mockResolvedValue([]);

    await expect(Libro.traerPorEstado(EstadoLectura.Leyendo, 4)).resolves.toEqual([]);
    expect(findAll).toHaveBeenCalledWith({
      where: { estado: EstadoLectura.Leyendo, usuarioId: 4 },
      include: [{ model: Categoria, attributes: ["id", "nombre"] }],
    });
  });

  it("cuenta libros por estado y usuario", async () => {
    const count = jest.spyOn(Libro, "count").mockResolvedValue(2);

    await expect(Libro.contarPorEstado(EstadoLectura.PorLeer, 4)).resolves.toBe(2);
    expect(count).toHaveBeenCalledWith({
      where: { estado: EstadoLectura.PorLeer, usuarioId: 4 },
    });
  });

  it.each([
    ["terminado", "terminadoRecientemente", EstadoLectura.Leido, "updatedAt"],
    ["leyendo", "leyendoRecientemente", EstadoLectura.Leyendo, "updatedAt"],
  ])("obtiene el libro %s más reciente", async (_, metodo, estado, campoOrden) => {
    const findOne = jest.spyOn(Libro, "findOne").mockResolvedValue({ titulo: "Libro reciente" });

    await expect(Libro[metodo](4)).resolves.toBe("Libro reciente");
    expect(findOne).toHaveBeenCalledWith({
      where: { estado, usuarioId: 4 },
      order: [[campoOrden, "DESC"]],
      attributes: ["titulo"],
    });
  });

  it("obtiene el libro incorporado más recientemente", async () => {
    const findOne = jest.spyOn(Libro, "findOne").mockResolvedValue({ titulo: "Libro nuevo" });

    await expect(Libro.incorporadoRecientemente(4)).resolves.toBe("Libro nuevo");
    expect(findOne).toHaveBeenCalledWith({
      where: { usuarioId: 4 },
      order: [["createdAt", "DESC"]],
      attributes: ["titulo"],
    });
  });

  it.each(["terminadoRecientemente", "incorporadoRecientemente", "leyendoRecientemente"])(
    "%s devuelve null si no hay libros",
    async (metodo) => {
      jest.spyOn(Libro, "findOne").mockResolvedValue(null);

      await expect(Libro[metodo](4)).resolves.toBeNull();
    },
  );
});

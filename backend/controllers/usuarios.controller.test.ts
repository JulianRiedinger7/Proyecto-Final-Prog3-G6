import { Request, Response, NextFunction } from "express";
import { UsuariosController } from "./usuarios.controller";
import { Usuario } from "../models/usuario.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

jest.mock("../models/usuario.model", () => ({
  Usuario: {
    traerTodos: jest.fn(),
    encontrarPorId: jest.fn(),
    encontrarPorMail: jest.fn(),
    borrarPorId: jest.fn(),
    crear: jest.fn(),
  },
}));

jest.mock("bcryptjs", () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

describe("UsuariosController", () => {
  const controller = new UsuariosController();
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {};
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnThis(),
    };
    next = jest.fn();
    jest.clearAllMocks();
    process.env.JWT_SECRET = "secreto-de-test";
  });

  describe("postRegister", () => {
    it("crea el usuario, hashea la contraseña y devuelve datos sin contraseña", async () => {
      req.body = { nombre: "Julieta", mail: "julieta@mail.com", contrasenia: "123456" };

      (Usuario.encontrarPorMail as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue("hash-fake");
      (Usuario.crear as jest.Mock).mockResolvedValue({
        id: 1,
        nombre: "Julieta",
        mail: "julieta@mail.com",
        contrasenia: "hash-fake",
      });

      await controller.postRegister(req as Request, res as Response, next);

      expect(bcrypt.hash).toHaveBeenCalledWith("123456", 10);
      expect(Usuario.crear).toHaveBeenCalledWith({
        nombre: "Julieta",
        mail: "julieta@mail.com",
        contrasenia: "hash-fake",
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        id: 1,
        nombre: "Julieta",
        mail: "julieta@mail.com",
      });
      // La contraseña (ni hasheada) no debe viajar en la respuesta
      const respuestaEnviada = (res.json as jest.Mock).mock.calls[0][0];
      expect(respuestaEnviada.contrasenia).toBeUndefined();
      expect(next).not.toHaveBeenCalled();
    });

    it("pasa el error 400 cuando faltan datos", async () => {
      req.body = { nombre: "Julieta" }; // sin mail ni contrasenia

      await controller.postRegister(req as Request, res as Response, next);

      expect(next).toHaveBeenCalled();
      const error = (next as jest.Mock).mock.calls[0][0] as Error;
      expect(error.message).toBe("Faltan datos del usuario");
      expect(error.name).toBe("400-Registro");
      expect(Usuario.crear).not.toHaveBeenCalled();
    });

    it("pasa el error 409 cuando el mail ya está registrado", async () => {
      req.body = { nombre: "Julieta", mail: "julieta@mail.com", contrasenia: "123456" };
      (Usuario.encontrarPorMail as jest.Mock).mockResolvedValue({
        id: 1,
        mail: "julieta@mail.com",
      });

      await controller.postRegister(req as Request, res as Response, next);

      expect(next).toHaveBeenCalled();
      const error = (next as jest.Mock).mock.calls[0][0] as Error;
      expect(error.message).toBe("Ya existe un usuario con ese mail");
      expect(error.name).toBe("409-MailExistente");
      expect(bcrypt.hash).not.toHaveBeenCalled();
      expect(Usuario.crear).not.toHaveBeenCalled();
    });
  });

  describe("postLogin", () => {
    const usuarioFake = {
      id: 1,
      nombre: "Julieta",
      mail: "julieta@mail.com",
      contrasenia: "hash-fake",
      toJSON() {
        return {
          id: this.id,
          nombre: this.nombre,
          mail: this.mail,
          contrasenia: this.contrasenia,
        };
      },
    };

    it("devuelve el token y el usuario sin contraseña cuando las credenciales son válidas", async () => {
      req.body = { mail: "julieta@mail.com", contrasenia: "123456" };

      (Usuario.encontrarPorMail as jest.Mock).mockResolvedValue(usuarioFake);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue("token-fake-123");

      await controller.postLogin(req as Request, res as Response, next);

      expect(bcrypt.compare).toHaveBeenCalledWith("123456", "hash-fake");
      expect(jwt.sign).toHaveBeenCalledWith(
        { id: 1, mail: "julieta@mail.com", nombre: "Julieta" },
        "secreto-de-test",
        { expiresIn: "24h" }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        usuario: { id: 1, nombre: "Julieta", mail: "julieta@mail.com" },
        token: "token-fake-123",
      });
      expect(next).not.toHaveBeenCalled();
    });

    it("pasa el error 400 cuando faltan credenciales", async () => {
      req.body = { mail: "julieta@mail.com" }; // sin contrasenia

      await controller.postLogin(req as Request, res as Response, next);

      expect(next).toHaveBeenCalled();
      const error = (next as jest.Mock).mock.calls[0][0] as Error;
      expect(error.message).toBe("Faltan credenciales");
      expect(error.name).toBe("400-Login");
    });

    it("pasa el error 401 cuando el mail no existe", async () => {
      req.body = { mail: "noexiste@mail.com", contrasenia: "123456" };
      (Usuario.encontrarPorMail as jest.Mock).mockResolvedValue(null);

      await controller.postLogin(req as Request, res as Response, next);

      expect(next).toHaveBeenCalled();
      const error = (next as jest.Mock).mock.calls[0][0] as Error;
      expect(error.message).toBe("Credenciales inválidas");
      expect(error.name).toBe("401-Login");
      expect(jwt.sign).not.toHaveBeenCalled();
    });

    it("pasa el error 401 cuando la contraseña es incorrecta", async () => {
      req.body = { mail: "julieta@mail.com", contrasenia: "incorrecta" };
      (Usuario.encontrarPorMail as jest.Mock).mockResolvedValue(usuarioFake);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await controller.postLogin(req as Request, res as Response, next);

      expect(next).toHaveBeenCalled();
      const error = (next as jest.Mock).mock.calls[0][0] as Error;
      expect(error.message).toBe("Credenciales inválidas");
      expect(error.name).toBe("401-Login");
      expect(jwt.sign).not.toHaveBeenCalled();
    });
  });
});
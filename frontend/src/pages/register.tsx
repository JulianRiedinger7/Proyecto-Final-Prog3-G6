import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as authService from "../services/authService";

export const Register = () => {
  const [nombre, setNombre] = useState("");
  const [mail, setMail] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await authService.registrar({ nombre, mail, contrasenia });
      navigate("/login");
    } catch (err) {
      console.log(err);
      setError("No se pudo registrar. ¿El mail ya está en uso?");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-secondary px-4">
      <h1 className="font-serif text-3xl font-semibold text-text mb-1">
        Mi Biblioteca
      </h1>
      <p className="text-accent text-sm mb-6">Tu santuario literario</p>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white rounded-lg border border-border p-6 flex flex-col gap-4"
      >
        <h2 className="font-serif text-xl font-semibold text-text">
          Registrarse
        </h2>

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <input
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
          className="border border-border rounded-md px-3 py-2 text-sm"
        />
        <input
          type="email"
          placeholder="Mail"
          value={mail}
          onChange={(e) => setMail(e.target.value)}
          required
          className="border border-border rounded-md px-3 py-2 text-sm"
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={contrasenia}
          onChange={(e) => setContrasenia(e.target.value)}
          required
          className="border border-border rounded-md px-3 py-2 text-sm"
        />

        <button
          type="submit"
          className="bg-primary text-white rounded-md py-2 text-sm font-medium hover:bg-primary-hover"
        >
          Crear cuenta
        </button>
      </form>

      <p className="text-sm text-text-light mt-4">
        ¿Ya tenés cuenta?{" "}
        <Link to="/login" className="text-primary font-medium hover:underline">
          Iniciá sesión
        </Link>
      </p>
    </div>
  );
};
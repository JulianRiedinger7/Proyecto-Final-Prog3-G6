import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Login = () => {
  const [mail, setMail] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      await login(mail, contrasenia);
      navigate("/"); // falta agregar ruta
    } catch (err) {
      console.error(err);
      setError("Credenciales inválidas");
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
          Iniciar sesión
        </h2>

        {error && <p className="text-red-600 text-sm">{error}</p>}

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
          Entrar
        </button>
      </form>

      <p className="text-sm text-text-light mt-4">
        ¿No tenés cuenta?{" "}
        <Link to="/registros" className="text-primary font-medium hover:underline">
          Registrate
        </Link>
      </p>
    </div>
  );
};
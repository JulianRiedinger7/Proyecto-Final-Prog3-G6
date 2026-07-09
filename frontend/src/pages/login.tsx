import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export const Login = () => {
  const [mail, setMail] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setCargando(true);
    try {
      await login(mail, contrasenia);
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Credenciales inválidas");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral px-4">
      <div className="mb-6 text-center">
        <h1 className="font-serif text-2xl text-gray-900">Mi Biblioteca</h1>
        <p className="text-sm text-primary italic">Tu santuario literario</p>
      </div>

      <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm p-8">
        <h2 className="text-center font-serif text-lg text-gray-900 mb-6">
          Iniciar Sesión
        </h2>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 text-red-600 text-sm px-3 py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Correo Electrónico
            </label>
            <input
              type="email"
              value={mail}
              onChange={(e) => setMail(e.target.value)}
              required
              placeholder="tu@email.com"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Contraseña
            </label>
            <input
              type="password"
              value={contrasenia}
              onChange={(e) => setContrasenia(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

          <button
            type="submit"
            disabled={cargando}
            className="w-full bg-primary hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed text-white font-medium rounded-lg py-2 text-sm transition-opacity"
          >
            {cargando ? "Ingresando..." : "Iniciar Sesión"}
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-6 text-center">
          ¿No tienes una cuenta?{" "}
          <Link to="/register" className="text-primary font-medium hover:underline">
            Regístrate aquí
          </Link>
        </p>
      </div>
    </div>
  );
};
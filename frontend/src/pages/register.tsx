import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import * as authService from "../services/authService";

export const Register = () => {
  const [nombre, setNombre] = useState("");
  const [mail, setMail] = useState("");
  const [contrasenia, setContrasenia] = useState("");
  const [error, setError] = useState("");
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setCargando(true);
    try {
      await authService.registrar({ nombre, mail, contrasenia });
      navigate("/login");
    } catch (err) {
      console.error(err);
      setError("No se pudo registrar. ¿El mail ya está en uso?");
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
          Crear Cuenta
        </h2>

        {error && (
          <div className="mb-4 rounded-lg bg-red-50 text-red-600 text-sm px-3 py-2">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre
            </label>
            <input
              type="text"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
              placeholder="Tu nombre"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
          </div>

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
            {cargando ? "Creando cuenta..." : "Crear Cuenta"}
          </button>
        </form>

        <p className="text-sm text-gray-500 mt-6 text-center">
          ¿Ya tienes una cuenta?{" "}
          <Link to="/login" className="text-primary font-medium hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  );
};
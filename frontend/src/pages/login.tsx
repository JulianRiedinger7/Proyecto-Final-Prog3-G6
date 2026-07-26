import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    <form onSubmit={handleSubmit}>
      <h2>Iniciar sesión</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        type="email"
        placeholder="Mail"
        value={mail}
        onChange={(e) => setMail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Contraseña"
        value={contrasenia}
        onChange={(e) => setContrasenia(e.target.value)}
        required
      />
      <button type="submit">Entrar</button>
    </form>
  );
};
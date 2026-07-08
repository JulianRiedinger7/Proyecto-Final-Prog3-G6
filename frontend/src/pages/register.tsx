import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    <form onSubmit={handleSubmit}>
      <h2>Registrarse</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <input
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
      />
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
      <button type="submit">Crear cuenta</button>
    </form>
  );
};
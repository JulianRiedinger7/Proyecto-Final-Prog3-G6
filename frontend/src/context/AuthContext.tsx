import { createContext, useState, ReactNode, useEffect } from "react";
import * as authService from "../services/authService";

interface Usuario {
  id: number;
  nombre: string;
  mail: string;
}

interface AuthContextType {
  usuario: Usuario | null;
  token: string | null;
  login: (mail: string, contrasenia: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [token, setToken] = useState<string | null>(null);

  
  useEffect(() => {
    const tokenGuardado = localStorage.getItem("token");
    const usuarioGuardado = localStorage.getItem("usuario");
    if (tokenGuardado && usuarioGuardado) {
      setToken(tokenGuardado);
      setUsuario(JSON.parse(usuarioGuardado));
    }
  }, []);

  const login = async (mail: string, contrasenia: string) => {
    const data = await authService.login({ mail, contrasenia });
    setUsuario(data.usuario);
    setToken(data.token);
    localStorage.setItem("token", data.token);
    localStorage.setItem("usuario", JSON.stringify(data.usuario));
  };

  const logout = () => {
    setUsuario(null);
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
  };

  return (
    <AuthContext.Provider value={{ usuario, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
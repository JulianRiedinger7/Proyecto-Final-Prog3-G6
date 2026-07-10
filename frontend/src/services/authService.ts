import api from "./api"; 
<<<<<<< HEAD

=======
>>>>>>> dev
export interface Credenciales {
  mail: string;
  contrasenia: string;
}

export interface DatosRegistro extends Credenciales {
  nombre: string;
}

export const login = async (datos: Credenciales) => {
  const { data } = await api.post("/usuarios/login", datos);
  return data; // { usuario, token }
};

export const registrar = async (datos: DatosRegistro) => {
  const { data } = await api.post("/usuarios/register", datos);
  return data; // { id, nombre, mail }
};
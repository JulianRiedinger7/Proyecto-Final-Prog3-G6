# Proyecto Final Grupo 6

Proyecto base para el trabajo final de Programacion 3. Es una aplicacion web completa con frontend, backend, base de datos y servicios auxiliares, todo orquestado con Docker Compose.

Link Frontend: https://proyecto-final-prog3-g6.vercel.app/
Link backend: https://proyecto-final-prog3-g6.onrender.com/api

## 👥 Integrantes - Grupo 6

- Julieta Dabús
- Alejandro Lucas Baldres
- Julian Riedinger
- Marianela Belardinelli
- Clara Zivano
- Matías F. Ledesma González

## 📋 Organización

### División del Trabajo

#### Alejandro Lucas Baldres

_Backend_

- Interfaces:
  1. Libro-interface: _Solo InterfaceLibro_
  2. dbConfig-interface
- Modelo Libro
- Manejador de Errores: error-libros-handler.middlerware.ts
- Seeder Libro
- Controlador Libro con los siguientes endpoints:
  1. GET /api/libros
  2. GET /api/libros/:id
  3. GET /api/libros/portada/:id
  4. POST /api/libros
  5. PUT /api/libros/:id
  6. DELETE /api/libros/:id
- Rutas:
  1. Asociadas a libros-controller
  2. Enrutador principal (index-router.ts)
- Refactorizacion a P.O.O e implementacion de TypeScript:
  1. App.ts
  2. Server.ts
  3. database.ts
- Fix:
  1. Configuracion CORS
- Metodo PUT en Controlador Categorias
- Metodo de Editar categoria Model Categorias

- Test Unitarios
  1. libro.model.test
  2. libros.controller
  3. error-libros-handler.middleware

- Test de Integracion
  1. index.routes (Solo lo que corresponde al los enpoints desarrollados por el alumno y el health)
  2. libros.routes (Solo lo que corresponde al los enpoints desarrollados por el alumno)

- Docs:
  1. APIT_test.md

_Frontend_

- Componentes:
  1. common/Genero.agregar
  2. common/GeneroItem.lista
  3. common/Genero.lista
  4. common/Genero.titulo
  5. ui/Boton.atras
  6. ui/Boton.generico
  7. ui/Icono.lista
  8. ui/InputEdicion.lista
  9. common/Error.mensaje
  10. ui/Boton.lista

- Paginas:
  1. GestionGenero.pages

- Servicios:
  1. Genero.service

- Tipos:
  1. Genero.type
  2. Respuesta.type

- Test Unitarios

1.  Error.mensaje.test
2.  Genero.agregar.test
3.  Genero.lista.test
4.  GeneroItem.lista.test
5.  Boton.atras.test
6.  Boton.generico.test
7.  Boton.lista.test
8.  InputEdicion.lista.test
9.  GestionGenero.pages.test

- CI/CD:
  1. Dockerfiles
  2. docker-compose

#### Marianela Belardinelli

**Estado de lectura**  
_Backend_

- Interfaz agregada a Libro-interface.ts:
  1. IActualizarEstado
- Controlador bookStatusController.ts con los siguientes endpoints:
  1. GET /api/libros/leidos
  2. GET /api/libros/leyendo
  3. GET /api/libros/por-leer
  4. PATCH /api/libros/:id/estado — valida que el estado sea un valor del enum EstadoLectura (por leer, leyendo, leido)
- Rutas agregadas a libros-routes.ts

_Frontend_

- Tipos agregados a src/types/Libro.type.ts: Libro
- Service src/services/libro.service.ts con los siguientes métodos:
  1. getLibros — GET /api/libros
  2. getLibroPorId — GET /api/libros/:id
  3. crearLibro — POST /api/libros
  4. editarLibro — PUT /api/libros/:id
  5. eliminarLibro — DELETE /api/libros/:id
- Componente reutilizable src/components/common/EstadoSelector.tsx — 3 botones Por leer / Leyendo / Leído
- Componente src/components/common/Genero.Dropdow.tsx — selector de géneros cargados desde la API
- Página src/pages/AnadirLibro.tsx — formulario completo para crear un libro con validaciones
- Página src/pages/Biblioteca.tsx — grilla de libros con filtros por estado
- Tests unitarios

#### Julieta Dabús

**Califaciones y Relaciones FK; Auth Frontend + JWT Backend (Register/Login)**
_Backend_

- Controlador calificacion-libros-controller.ts con los siguientes endpoints:

1. PATCH /api/libros/:id/calificacion — valida que sea entre 1 y 5
2. GET /api/libros/mejor-calificados — devuelve libros con puntaje asignado, ordenados de mayor a menor

- Rutas agregadas a libros-routes.ts
- Relaciones FK definidas mediante decoradores @ForeingKey y @BelongsTo en el modelo Libro.ts:
  - usuarioId -> @ForeingKey (() => Usuario)
  - generoId -> @ForeingKey (() => Categoria)
- Actualización de traerTodos y encontrarPorId para incluir Usuario y Categoria en la respuesta

_Backend (JWT)_

- Instalación de bcryptjs + jsonwebtoken

1. POST /api/usuarios/register → hashea la contraseña con bcrypt antes de guardar
2. POST /api/usuarios/login → valida credenciales y devuelve token JWT

- Middleware auth.middleware.ts — valida el token JWT recibido en el header Authorization:si falta, expiró o es inválido, corta la request con un error nombrado (401-TokenFaltante, 401-TokenExpirado, 401-TokenInvalido). Si es válido, decodifica el payload (id, mail, nombre) y lo inyecta en req.user para que los controladores sepan qué usuario está haciendo la request.
- Middleware error-auth.ts — intercepta los errores nombrados que lanza auth.middleware.ts y responde con status 401 y el mensaje correspondiente; cualquier otro error lo delega al manejador general de errores.
- Rutas protegidas con authMiddleware:
  - Todas las rutas de /api/libros (incluidas mejor-calificados, :id/calificacion, portada/:id, leidos, leyendo, por-leer, :id/actualizarresenia, :id/estado)
  - Todas las rutas de /api/categorias /api/estadisticas
  - Las rutas de /api/usuarios (register, login, y el resto) quedan sin authMiddleware, ya que register/login son necesariamente públicas para poder obtener el token

_Tests Unitarios Backend:_

- Test del controlador de calificaciones: calificaciones.libros.controller.test.ts
- Test del controlador de usuarios (register y login): usuarios.controller.test.ts
- Test del middleware de autenticación: auth.middleware.test.ts
- Test del manejador de errores de auth: error-auth.test.ts

_Frontend_

- pages/Login.tsx — formulario completo
- pages/Register.tsx — formulario de registro
- context/AuthContext.tsx — guarda token en localStorage, expone login(), logout(), usuario
- hooks/useAuth.ts — wrapper del contexto
- components/ProtectedRoute.tsx — redirige a Login si no hay token
- services/authService.ts — llamadas a register y login

_Tests Unitarios Frontend_

- Test del servicio de auth: authService.test.ts
- Test del contexto de auth: AuthContext.test.tsx
- Test del hook useAuth: useAuth.test.tsx
- Test de la ruta protegida: ProtectedRoute.test.tsx

#### Matías F. Ledesma González

- Sección estadísticas (Estadistica.interface.ts, estadisticas.utils.ts y estadisticas.controller.ts)
- Esta sección trabaja sobre la base de datos y devuelve un resumen con las siguientes variables (utils/estadisticas.utils.ts/Class Estadisticas):
  1. TotalLibros: devuelve el número cargado en la base de datos
  2. LibrosLeidos, LibrosLeyendo y LibrosPorLeer: devuelve el número de libros según cada estado
  3. LeidoReciente: devuelve el título del último libro que estemos leyendo, sino existiera devuelve "-"
  4. TerminadoReciente: devuelve el título del último libro terminado, sino existiera devuelve "-"
  5. UltimoIncorporado: devuleve el título del último libro incorporado, sino existiera devuelve "-"

- Función actualizarResenia()
  Esta función dentro de libro.models.ts encuentra el libro por ID y actualiza el atributo reseña (string) c on la nueva información incorporada por el usuario.

#### Julián Riedinger

**Entidad Categorias**  
_Backend_

- Interfaz Categorias
- Modelo Categorias
- Manejador de Errores Global: error-handler.middleware.ts
- Manejador de Errores de Categoria
- Fix en Delete de Libros para manejar error particular
- Seeder Categorias
- Controlador Categorias con los siguientes endpoints:
  1. GET /api/categorias
  2. GET /api/categorias/:id
  3. POST /api/categorias
  4. DELETE /api/categorias/:id
- Rutas asociadas a categorias-controller

_Tests Unitarios Backend_

- Test del modelo Categorias: categorias.model.test.ts
- Test del controlador Categorias: categorias.controller.test.ts
- Test del manejador de errores: error-handler.middleware.test.ts

**Dashboard y Sección Mejor Calificados**  
_Frontend_

- Páginas:
  1. dashboard.page.tsx — carga de estadísticas, libros y géneros en paralelo con Promise.all, filtrado por género en memoria
  2. mejorCalificados.page.tsx
- Componentes (components/common/):
  1. generoPill.tsx
  2. bookCard.tsx
- Utilidades:
  1. services/libro.service.ts/obtenerPortadaUrl — construcción de URL de portada desde Open Library
- Servicios:
  1. services/estadisticas.service.ts

_Tests Unitarios Frontend_

- Test de páginas:
  1. dashboard.page.test.tsx
  2. mejorCalificados.page.test.tsx
- Test de componentes:
  1. components/common/generoPill.test.tsx
  2. components/common/bookCard.test.tsx

#### Clara Zivano

- Interfaz Usuario
- Modelo Usuario
- Seeder de Usuario (con 3 caso)
- Controlador Usuario con los siguientes endpoints:
  1. GET /api/usuarios
  2. GET /api/usuarios/:id
  3. POST /api/usuarios
  4. DELETE /api/usuarios/:id
- Router Usuarios

## Metodologías utilizadas

Esta sección define el flujo de trabajo y las convenciones de nomenclatura para la gestión de ramas en el proyecto, asegurando un historial limpio y una integración controlada a través de GitHub.

### Estructura de Ramas Principales

El proyecto se rige por dos ramas estables de larga duración:

- Main: Es la rama principal del proyecto. Contiene la versión lista para entregar, por lo que sólo debe recibir código que haya sido probado y aprobado.
- Dev: Es la rama de integración. Aquí se consolidan todas las funcionalidades y correcciones antes de pasar a la rama principal. Es el entorno de desarrollo activo.

### Convenciones para Ramas Personales

Cada integrante del grupo trabajará en ramas creadas a partir de Dev. El nombre de estas ramas debe seguir una estructura específica según el propósito de la tarea:

A. Nuevas Funcionalidades (Features) Si la tarea consiste en agregar una nueva característica o componente al proyecto:

- Formato: feature/agregado-Iniciales
- Ejemplo: feature/formulario-JD

B. Corrección de Errores (Fixes) Si la tarea consiste en solucionar un error o realizar un ajuste técnico:

- Formato: fix/correccion-Iniciales
- Ejemplo: fix/validaciones-JD

C. Documentación (Docs) Si la tarea consiste en generar o modificar documentación:

- Formato: docs/descripcion-Iniciales
- Ejemplo: docs/readme-ALL

## Resumen de Flujo de Trabajo

1. Estar posicionado en Dev y hacer un git pull para tener lo último.
2. Crear la rama personal: git checkout -b feature/mi-tarea-AB
3. Realizar los cambios y hacer commit.
4. Subir la rama al repositorio remoto: git push --set-upstream origin feature/mi-tarea-AB
5. Abrir el Pull Request en GitHub hacia la rama Dev.
6. Realizar el Merge a la rama Dev.
7. Una vez que el código de Dev esté estabilizado y listo para generar el entregable,
   realizar el Pull Request a Main.

## Documentación Técnica

## Variables de entorno (.env)

> **IMPORTANTE**  
> A fin de cumplimentar con lo requerido en los criterios de
> aprobación se establecieron valores por defecto en caso de no encontrar las correspondientes variables en el .env. Esta practica se desaconseja fuera del entorno academico.  
> Es por ello que marcamos como obligatoria el establecimiento de las mismas.

| Variable                               | Descripción                                | Valor por defecto                  | Obligatoria |
| -------------------------------------- | ------------------------------------------ | ---------------------------------- | ----------- |
| `POSTGRES_DB`                          | Nombre de la base de datos                 | `app_database`                     | Si          |
| `POSTGRES_USER`                        | Usuario root de la base de datos           | `app_user`                         | Si          |
| `POSTGRES_PASSWORD`                    | Contraseña de root                         | `app_password`                     | Si          |
| **Variables del Entorno del Backend**  |
| `NODE_ENV`                             | Entorno de Node del Backend                | `development`                      | Si          |
| `PORT`                                 | Puerto del Backend                         | `3001`                             | Si          |
| `DB_PORT`                              | Puerto de la base de datos                 | `5432`                             | Si          |
| `DB_USER`                              | Usuario de la base de datos                | `app_user`                         | Si          |
| `DB_PASSWORD`                          | Contraseña del usuario de la base de datos | `app_password`                     | Si          |
| `JWT_SECRET`                           | Secreto para validar JWT                   | `UHJ1ZWJhYmFja2VuZFNlY3JldEpXVAo=` | Si          |
| `CORS_ORIGIN`                          | URI Frontend                               | `http://localhost:5173`            | Si          |
| **Variables del Entorno del Frontend** |
| `VITE_API_URL`                         | Nombre de la base de datos                 | `http://localhost:3001/api`        | Si          |

## Arquitectura General

```

┌─────────────┐    ┌─────────────┐
│   React     │    │   Express   │
│ (Frontend)  │◄──►│  (Backend)  │
│   :3000     │    │   :3001     │
└─────────────┘    └─────────────┘
                           │
                   ┌─────────────┐
                   │ PostgreSQL  │
                   │    (DB)     │
                   │   :5432     │
                   └─────────────┘
```

Todos los servicios corren dentro de contenedores Docker y se comunican a traves de una red interna (`app_network`). Para el caso del FrontEnd se utiliza Nginx como reverse proxy.

| Servicio     | Tecnologia                       | Puerto | Funcion                  |
| ------------ | -------------------------------- | ------ | ------------------------ |
| **Frontend** | React 18                         | 5173   | Interfaz de usuario      |
| **Backend**  | Express + TypeScript + Sequelize | 3001   | API REST                 |
| **Database** | PostgreSQL 15                    | 5432   | Base de datos relacional |

---

## Inicio Rapido

### Requisitos previos

- [Docker](https://docs.docker.com/get-docker/) y [Docker Compose](https://docs.docker.com/compose/install/) instalados.

### Levantar el proyecto

> **IMPORTANTE**  
> Se recomienda la configuracion del .env correspondiente en la raiz del proyecto

```bash
# Construir las imagenes (solo la primera vez o cuando cambien dependencias)
docker-compose build

# Iniciar todos los servicios
docker-compose up
```

Una vez que todo este corriendo, podes acceder a:

| Recurso          | URL                       |
| ---------------- | ------------------------- |
| Frontend (React) | http://localhost:5173     |
| Backend API      | http://localhost:3001/api |

> **Tip:** Si queres correrlo en segundo plano, usa `docker-compose up -d`. Para ver los logs: `docker-compose logs -f`.

### Detener el proyecto

```bash
# Detener los servicios (mantiene los datos)
docker-compose down

# Detener y borrar todos los datos (base de datos, cache, etc.)
docker-compose down -v
```

---

## Estructura del Proyecto

```tree
.
├── API_test.md
├── compose.yml
├── package.json
├── pnpm-lock.yaml
├── README.md
├── backend/
│   ├── Dockerfile
│   ├── Dockerfile.dev
│   ├── app.ts
│   ├── jest.config.cjs
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── tsconfig.json
│   ├── assets/
│   │   └── entidad-relacion.png
│   ├── config/
│   │   └── database.ts
│   ├── controllers/
│   │   ├── calificaciones.libros.controller.test.ts
│   │   ├── calificaciones.libros.controller.ts
│   │   ├── categorias.controller.test.ts
│   │   ├── categorias.controller.ts
│   │   ├── estadisticas.controller.ts
│   │   ├── estado.libro.controller.test.ts
│   │   ├── estado.libro.controller.ts
│   │   ├── libros.controller.test.ts
│   │   ├── libros.controller.ts
│   │   ├── usuarios.controller.test.ts
│   │   └── usuarios.controller.ts
│   ├── core/
│   │   └── server.ts
│   ├── interfaces/
│   │   ├── Estadistica.interface.ts
│   │   ├── Libro.interface.ts
│   │   ├── Usuario.interface.ts
│   │   ├── categoria.interface.ts
│   │   └── dbConfig.interface.ts
│   ├── middleware/
│   │   ├── auth.middleware.test.ts
│   │   ├── auth.middleware.ts
│   │   ├── error-auth.test.ts
│   │   ├── error-auth.ts
│   │   ├── error-categorias-handler.middleware.test.ts
│   │   ├── error-categorias-handler.middleware.ts
│   │   ├── error-handler.middleware.ts
│   │   ├── error-libros-handler.middleware.test.ts
│   │   ├── error-libros-handler.middleware.ts
│   │   └── error-usuarios-handler.middleware.ts
│   ├── models/
│   │   ├── categoria.model.test.ts
│   │   ├── categoria.model.ts
│   │   ├── index.ts
│   │   ├── libro.model.test.ts
│   │   ├── libro.model.ts
│   │   └── usuario.model.ts
│   ├── routes/
│   │   ├── categorias.routes.ts
│   │   ├── index.routes.test.ts
│   │   ├── index.routes.ts
│   │   ├── libros.routes.test.ts
│   │   ├── libros.routes.ts
│   │   └── usuarios.routes.ts
│   ├── seeders/
│   │   ├── 20260605145618-categorias.ts
│   │   ├── 20260606-seeder-libro.ts
│   │   └── 20260614-seeder-usuarios.ts
│   └── utils/
│       └── estadisticas.util.ts
└── frontend/
    ├── Dockerfile
    ├── eslint.config.js
    ├── index.html
    ├── nginx.conf
    ├── package.json
    ├── pnpm-lock.yaml
    ├── pnpm-workspace.yaml
    ├── README.md
    ├── tailwind.config.ts
    ├── tsconfig.app.json
    ├── tsconfig.json
    ├── tsconfig.node.json
    └── vite.config.ts
    ├── public/
    │   ├── book-cover-placeholder.png
    │   ├── favicon.svg
    │   └── icons.svg
    └── src/
        ├── App.css
        ├── App.tsx
        ├── index.css
        ├── main.tsx
        ├── assets/
        │   ├── hero.png
        │   ├── react.svg
        │   └── vite.svg
        ├── components/
        │   ├── CalificacionStars.tsx
        │   ├── LibroInfo.tsx
        │   ├── ProtectedRoute.tsx
        │   ├── ReseniaForm.tsx
        │   ├── books/
        │   │   └── bookcard.tsx
        │   ├── common/
        │   │   ├── Error.mensaje.test.tsx
        │   │   ├── Error.mensaje.tsx
        │   │   ├── Estado.selector.test.tsx
        │   │   ├── Estado.selector.tsx
        │   │   ├── Genero.agregar.test.tsx
        │   │   ├── Genero.agregar.tsx
        │   │   ├── Genero.dropdown.test.tsx
        │   │   ├── Genero.dropdown.tsx
        │   │   ├── Genero.lista.test.tsx
        │   │   ├── Genero.lista.tsx
        │   │   ├── Genero.titulo.tsx
        │   │   ├── GeneroItem.lista.test.tsx
        │   │   ├── GeneroItem.lista.tsx
        │   │   ├── bookCard.test.tsx
        │   │   ├── bookCard.tsx
        │   │   ├── generoPill.test.tsx
        │   │   ├── generoPill.tsx
        │   │   ├── statsCard.test.tsx
        │   │   └── statsCard.tsx
        │   ├── layout/
        │   │   ├── MainLayout.tsx
        │   │   ├── Navbar.tsx
        │   │   └── Sidebar.tsx
        │   └── ui/
        │       ├── Boton.atras.test.tsx
        │       ├── Boton.atras.tsx
        │       ├── Boton.generico.test.tsx
        │       ├── Boton.generico.tsx
        │       ├── Boton.lista.test.tsx
        │       ├── Boton.lista.tsx
        │       ├── Icono.lista.test.tsx
        │       ├── Icono.lista.tsx
        │       ├── InputEdicion.lista.test.tsx
        │       └── InputEdicion.lista.tsx
        ├── context/
        │   └── AuthContext.tsx
        ├── hooks/
        │   └── useAuth.ts
        ├── pages/
        │   ├── AnadirLibro.test.tsx
        │   ├── AnadirLibro.tsx
        │   ├── Biblioteca.test.tsx
        │   ├── Biblioteca.tsx
        │   ├── DetalleLibro.tsx
        │   ├── GestionGenero.pages.test.tsx
        │   ├── GestionGenero.pages.tsx
        │   ├── dashboard.page.tsx
        │   ├── dashboard.pages.test.tsx
        │   ├── login.tsx
        │   ├── mejorCalificados.page.tsx
        │   ├── mejorCalificados.pages.test.tsx
        │   └── register.tsx
        ├── routes/
        │   └── AppRouter.tsx
        ├── services/
        │   ├── api.ts
        │   ├── authService.ts
        │   ├── detalleLibroService.ts
        │   ├── estadisticas.service.ts
        │   ├── genero.service.ts
        │   └── libro.service.ts
        ├── tests/
        │   ├── api.test.ts
        │   ├── authContext.test.tsx
        │   ├── authService.test.ts
        │   ├── biblioteca.test.ts
        │   ├── protectedRoute.test.tsx
        │   ├── setup.ts
        │   └── useAuth.test.tsx
        └── types/
            ├── Estadisticas.type.ts
            ├── Genero.type.ts
            ├── Libro.type.ts
            └── Respuesta.type.ts
```

## Diagrama Entidad-Relacion

![Diagrama Entidad Relacion](./backend/assets/entidad-relacion.png)

## Tecnologias Utilizadas

### Backend

- **[Express](https://expressjs.com/)** — Framework web para Node.js
- **[Sequelize](https://sequelize.org/)** — ORM para bases de datos SQL
- **[TypeScript](https://www.typescriptlang.org/)** — JS Tipado
- **[Jest](https://jestjs.io/)** - Herramienta de Test para JS
- **[CORS](https://github.com/expressjs/cors)** — Configuracion de Cross-Origin Resource Sharing

### Frontend

- **[React](https://es.react.dev/)** - Libreria de interfaz de usuario
- **[Vite](https://vite.dev/)** - DevTool para react
- **[TypeScript](https://www.typescriptlang.org/)** — JS Tipado
- **[Tailwindcss](https://tailwindcss.com/)** - CSS Framework

### Infraestructura

- **[Docker](https://docs.docker.com/)** — Contenedores
- **[Docker Compose](https://docs.docker.com/compose/)** — Orquestacion multi-contenedor
- **[PostgreSQL 15](https://www.postgresql.org/docs/15/)** — Base de datos relacional
- **[NGINX](https://nginx.org/)** - Proxy Inverso

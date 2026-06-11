# Proyecto Final Grupo 6

Proyecto base para el trabajo final de Programacion 3. Es una aplicacion web completa con frontend, backend, base de datos y servicios auxiliares, todo orquestado con Docker Compose.

Link render:  
Documentación Postman:

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

**Entidad Libro**  
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

#### Marianela Belardinelli

Agrega a src/interfaces/IBook.ts: IUpdateBookStatusDTO
src/controllers/bookStatusController.ts

PATCH /api/libros/:id/estado — valida que sea por_leer, leyendo o leido
GET /api/libros/leidos
GET /api/libros/leyendo
GET /api/libros/por-leer

Agrega sus rutas a src/routes/books.ts

#### Julieta Dabús

Agrega a src/interfaces/IBook.ts: IUpdateBookRatingDTO
src/controllers/bookRatingController.ts

PATCH /api/libros/:id/calificacion — valida que sea entre 1 y 5
GET /api/libros/mejor-calificados — ORDER BY rating DESC donde rating no es null

Agrega sus rutas a src/routes/books.ts

#### Matías F. Ledesma González

src/interfaces/IStats.ts — IBookStats
src/controllers/bookReviewController.ts

PATCH /api/libros/:id/resena
GET /api/libros/stats — devuelve IBookStats: total de libros, cantidad por cada estado, promedio de rating, género con más libros

Agrega sus rutas a src/routes/books.ts
Consolida el API_test.md grupal con los cURLs de todos

#### Julián Riedinger

src/interfaces/IGenre.ts — IGenre
src/models/Genre.ts
src/migrations/XXXX-create-genres.ts
src/seeders/XXXX-demo-genres.ts — Ficción, No ficción, Ciencia ficción, Historia, Fantasía, Terror, Biografía
src/controllers/genreController.ts

GET /api/generos
GET /api/generos/:id
POST /api/generos
DELETE /api/generos/:id

src/routes/genres.ts

#### Clara Zivano

src/interfaces/IUser.ts — IUser
src/models/User.ts
src/migrations/XXXX-create-users.ts
src/seeders/XXXX-demo-users.ts — 3 usuarios de prueba
src/controllers/userController.ts

GET /api/usuarios
GET /api/usuarios/:id
POST /api/usuarios
DELETE /api/usuarios/:id
src/routes/users.ts

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

## Arquitectura General

```
    (Por                (Por
implementar)        implementar)
┌─────────────┐    ┌─────────────┐    ┌─────────────┐
│   Caddy     │    │   React     │    │   Express   │
│  (Proxy)    │◄──►│ (Frontend)  │◄──►│  (Backend)  │
│   :80       │    │   :3000     │    │   :3001     │
└─────────────┘    └─────────────┘    └─────────────┘
                                              │
                                      ┌─────────────┐
                                      │ PostgreSQL  │
                                      │    (DB)     │
                                      │   :5432     │
                                      └─────────────┘
```

Todos los servicios corren dentro de contenedores Docker y se comunican a traves de una red interna (`app_network`). Caddy actua como reverse proxy: recibe todo el trafico en el puerto 80 y lo redirige al frontend o al backend segun la URL.

| Servicio     | Tecnologia                       | Puerto | Funcion                        |
| ------------ | -------------------------------- | ------ | ------------------------------ |
| **Frontend** | React 18                         | 3000   | Interfaz de usuario            |
| **Backend**  | Express + TypeScript + Sequelize | 3001   | API REST                       |
| **Database** | PostgreSQL 15                    | 5432   | Base de datos relacional       |
| **Proxy**    | Caddy 2                          | 80     | Reverse proxy                  |
| **pgAdmin**  | pgAdmin 4                        | 5050   | Administracion visual de la BD |

---

## Inicio Rapido

### Requisitos previos

- [Docker](https://docs.docker.com/get-docker/) y [Docker Compose](https://docs.docker.com/compose/install/) instalados.

### Levantar el proyecto

```bash
# Construir las imagenes (solo la primera vez o cuando cambien dependencias)
docker-compose build

# Iniciar todos los servicios
docker-compose up
```

Una vez que todo este corriendo, podes acceder a:

| Recurso          | URL                       |
| ---------------- | ------------------------- |
| Frontend (React) | http://localhost:3000     |
| Backend API      | http://localhost:3001/api |
| Proxy (Caddy)    | http://localhost          |
| pgAdmin          | http://localhost:5050     |

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

```
proyecto/
├── docker-compose.yml              # Orquestacion de todos los servicios
├── .gitignore
├── README.md
│
├── backend/
│   ├── Dockerfile.dev               # Imagen Docker para desarrollo
│   ├── package.json
│   ├── app.ts                    # Punto de entrada del servidor Express
│   ├── config/
│   │   └── database.ts              # Config de conexion a PostgreSQL
│   ├── models/
│   │   ├── index.ts                 # Inicializa Sequelize y registra modelos
│   │   └── Libro.ts                  # Modelo de usuario (tiene TODOs)
│   ├── controllers/
│   │   ├── estado-libro-controller.ts  # Logica de manejo para los estados de Libros
│   │   └── libros-controller.ts        # Logica de manejo para los libros
│   ├── middleware/
│   │   ├── error-handler.middleware.js # Manejador de errores Genericos
|   |   └── error-libros-handler.middlerware.ts # Manejador de errores particulares del controller Libros-Controller.ts
│   ├── routes/
│   │   ├── index-routes.ts          # Router principal
│   │   └── libros-routes.ts         # Rutas relacionada a los manejadores estado-libro y libros-controller
│   ├── seeders/                     # Datos de prueba
|   |   └── 20260606-seeder-libro.ts # Seeder para completar la tabla Libro
│   ├── core/                     # Contenedor del Core de la API
|   |   └── server.ts
│   └── interfaces/
│       ├── dbConfig-interface.ts    # Interface de la configuracion a la Base de datos
│       └── Libro-interface.ts       # Interfaz del Modelo Libro
│
└── frontend/
    └── TODO

```

## Diagrama Entidad-Relacion

![Diagrama Entidad Relacion](./backend/assets/entidad-relacion.png)

## Tecnologias Utilizadas

### Backend

- **[Express](https://expressjs.com/)** — Framework web para Node.js
- **[Sequelize](https://sequelize.org/)** — ORM para bases de datos SQL
- **[TypeScript](https://www.typescriptlang.org/)** — JS Tipado
- **[cors](https://github.com/expressjs/cors)** — Configuracion de Cross-Origin Resource Sharing

### Infraestructura

- **[Docker](https://docs.docker.com/)** — Contenedores
- **[Docker Compose](https://docs.docker.com/compose/)** — Orquestacion multi-contenedor
- **[PostgreSQL 15](https://www.postgresql.org/docs/15/)** — Base de datos relacional

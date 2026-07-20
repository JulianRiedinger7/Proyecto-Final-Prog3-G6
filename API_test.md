# API Test - Proyecto Final Prog3 G6

Este archivo reúne ejemplos de peticiones HTTP para probar la API del backend del proyecto, basándose en las rutas y controladores reales definidos en la carpeta backend.

---

## 1. Configuración inicial

### Variables de entorno
```bash
export BASE_URL="http://localhost:3001"
export API_URL="$BASE_URL/api"
export JWT_SECRET="tu_secret"
```

### Verificar que el backend esté levantado
```bash
curl -X GET "$BASE_URL/health"
```

Respuesta esperada:
```json
{
  "status": "OK",
  "timestamp": "...",
  "uptime": 123.45
}
```

### Verificar la API
```bash
curl -X GET "$API_URL/health"
```

Respuesta esperada:
```json
{
  "status": "OK",
  "message": "API funcionando correctamente",
  "timestamp": "...",
  "environment": "development"
}
```

---

## 2. Autenticación de usuarios

El backend expone los endpoints de registro y login en la ruta /api/usuarios.

### Registrar un usuario
```bash
curl -X POST "$API_URL/usuarios/register" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Test User",
    "mail": "test@example.com",
    "contrasenia": "123456"
  }'
```

Respuesta esperada (201):
```json
{
  "id": 1,
  "nombre": "Test User",
  "mail": "test@example.com"
}
```

### Iniciar sesión
```bash
curl -X POST "$API_URL/usuarios/login" \
  -H "Content-Type: application/json" \
  -d '{
    "mail": "test@example.com",
    "contrasenia": "123456"
  }'
```

Respuesta esperada (200):
```json
{
  "usuario": {
    "id": 1,
    "nombre": "Test User",
    "mail": "test@example.com"
  },
  "token": "jwt_token"
}
```

### Guardar el token
```bash
export TOKEN="<token_obtenido>"
```

---

## 3. Usuarios

### Obtener todos los usuarios
```bash
curl -X GET "$API_URL/usuarios" \
  -H "Authorization: Bearer $TOKEN"
```

### Obtener un usuario por ID
```bash
curl -X GET "$API_URL/usuarios/1" \
  -H "Authorization: Bearer $TOKEN"
```

### Eliminar un usuario
```bash
curl -X DELETE "$API_URL/usuarios/1" \
  -H "Authorization: Bearer $TOKEN"
```

---

## 4. Libros

Los libros están protegidos por autenticación y se acceden a través de /api/libros.

### Obtener todos los libros del usuario autenticado
```bash
curl -X GET "$API_URL/libros" \
  -H "Authorization: Bearer $TOKEN"
```

### Obtener un libro por ID
```bash
curl -X GET "$API_URL/libros/1" \
  -H "Authorization: Bearer $TOKEN"
```

### Crear un libro
```bash
curl -X POST "$API_URL/libros" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "El Hobbit",
    "autor": "J.R.R. Tolkien",
    "anio": 1937,
    "estado": "leyendo",
    "generoId": 1,
    "puntaje": 4.5,
    "resenia": "Muy buena lectura"
  }'
```

### Actualizar un libro
```bash
curl -X PUT "$API_URL/libros/1" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "titulo": "El Hobbit",
    "autor": "J.R.R. Tolkien",
    "anio": 1937,
    "estado": "leido"
  }'
```

### Eliminar un libro
```bash
curl -X DELETE "$API_URL/libros/1" \
  -H "Authorization: Bearer $TOKEN"
```

### Actualizar reseña de un libro
```bash
curl -X PATCH "$API_URL/libros/1/actualizarresenia" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "resenia": "Recomendado para amantes de la fantasía"
  }'
```

### Obtener portada de un libro
```bash
curl -X GET "$API_URL/libros/portada/1" \
  -H "Authorization: Bearer $TOKEN"
```

### Obtener libros por estado
```bash
curl -X GET "$API_URL/libros/leidos" \
  -H "Authorization: Bearer $TOKEN"

curl -X GET "$API_URL/libros/leyendo" \
  -H "Authorization: Bearer $TOKEN"

curl -X GET "$API_URL/libros/por-leer" \
  -H "Authorization: Bearer $TOKEN"
```

### Actualizar estado de lectura
```bash
curl -X PATCH "$API_URL/libros/1/estado" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "estado": "leido"
  }'
```

### Actualizar calificación de un libro
```bash
curl -X PATCH "$API_URL/libros/1/calificacion" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "puntaje": 5
  }'
```

### Obtener libros mejor calificados
```bash
curl -X GET "$API_URL/libros/mejor-calificados" \
  -H "Authorization: Bearer $TOKEN"
```

---

## 5. Categorías

### Obtener todas las categorías
```bash
curl -X GET "$API_URL/categorias" \
  -H "Authorization: Bearer $TOKEN"
```

### Obtener una categoría por ID
```bash
curl -X GET "$API_URL/categorias/1" \
  -H "Authorization: Bearer $TOKEN"
```

### Crear una categoría
```bash
curl -X POST "$API_URL/categorias" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Fantasía"
  }'
```

### Actualizar una categoría
```bash
curl -X PUT "$API_URL/categorias/1" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Ciencia Ficción"
  }'
```

### Eliminar una categoría
```bash
curl -X DELETE "$API_URL/categorias/1" \
  -H "Authorization: Bearer $TOKEN"
```

---

## 6. Estadísticas

### Obtener estadísticas del usuario autenticado
```bash
curl -X GET "$API_URL/estadisticas" \
  -H "Authorization: Bearer $TOKEN"
```

---

## 7. Casos de error comunes

### Sin token
```bash
curl -X GET "$API_URL/libros"
```

### Token inválido o expirado
```bash
curl -X GET "$API_URL/libros" \
  -H "Authorization: Bearer token_invalido"
```

### Recurso inexistente
```bash
curl -X GET "$API_URL/libros/999999" \
  -H "Authorization: Bearer $TOKEN"
```

### Datos incompletos en registro
```bash
curl -X POST "$API_URL/usuarios/register" \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Falta mail"
  }'
```

---

## 8. Ejemplos de respuestas esperadas por endpoint

### GET /health
```json
{
  "status": "OK",
  "timestamp": "2026-07-20T12:00:00.000Z",
  "uptime": 12.34
}
```

### GET /api/health
```json
{
  "status": "OK",
  "message": "API funcionando correctamente",
  "timestamp": "2026-07-20T12:00:00.000Z",
  "environment": "development"
}
```

### POST /api/usuarios/register
```json
{
  "id": 1,
  "nombre": "Test User",
  "mail": "test@example.com"
}
```

### POST /api/usuarios/login
```json
{
  "usuario": {
    "id": 1,
    "nombre": "Test User",
    "mail": "test@example.com"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### GET /api/libros
```json
[
  {
    "id": 1,
    "titulo": "El Hobbit",
    "autor": "J.R.R. Tolkien",
    "anio": 1937,
    "estado": "leyendo",
    "puntaje": 4.5,
    "resenia": "Muy buena lectura",
    "generoId": 1,
    "usuarioId": 1
  }
]
```

### POST /api/libros
```json
{
  "id": 1,
  "titulo": "El Hobbit",
  "autor": "J.R.R. Tolkien",
  "anio": 1937,
  "estado": "leyendo",
  "puntaje": 4.5,
  "resenia": "Muy buena lectura",
  "generoId": 1,
  "usuarioId": 1
}
```

### PATCH /api/libros/:id/estado
```json
{
  "id": 1,
  "titulo": "El Hobbit",
  "autor": "J.R.R. Tolkien",
  "anio": 1937,
  "estado": "leido",
  "puntaje": 4.5,
  "resenia": "Muy buena lectura",
  "generoId": 1,
  "usuarioId": 1
}
```

### GET /api/categorias
```json
[
  {
    "id": 1,
    "nombre": "Fantasía"
  }
]
```

### GET /api/estadisticas
```json
{
  "totalLibros": 5,
  "librosLeidos": 2,
  "librosLeyendo": 2,
  "librosPorLeer": 1,
  "ultimoLibroLeido": "El Hobbit",
  "libroAgregadoRecientemente": "Dune"
}
```

### Error 401 - Token faltante o inválido
```json
{
  "error": "Token no proporcionado"
}
```

### Error 404 - Recurso no encontrado
```json
{
  "error": "Route not found"
}
```

---

## 9. Notas útiles

- El puerto por defecto del backend es 3001.
- La API está montada bajo /api.
- La mayoría de los endpoints de libros y categorías requieren un token JWT válido.
- Los estados válidos para libros son: por leer, leyendo y leido.

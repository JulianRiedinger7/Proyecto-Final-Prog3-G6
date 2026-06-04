FROM node:18-alpine

WORKDIR /app

# Instalar dependencias
COPY package*.json ./
RUN npm install -g pnpm
RUN pnpm install

# Copiar código fuente
COPY . .

# Exponer puerto
EXPOSE 3001

# Comando por defecto
CMD ["pnpm", "run", "dev"]

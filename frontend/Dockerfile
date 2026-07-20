FROM node:lts-alpine AS constructor

WORKDIR /app
ARG VITE_API_URL=http://localhost:3001/api
ENV CI=true
ENV VITE_API_URL=${VITE_API_URL}
COPY package*.json ./
RUN corepack enable pnpm
RUN pnpm install
COPY . .
RUN pnpm run build

FROM nginx:alpine 

COPY --from=constructor /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
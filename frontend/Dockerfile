FROM node:lts-alpine AS constructor

WORKDIR /app
COPY package*.json ./
ENV CI=true
RUN corepack enable pnpm
RUN pnpm install
COPY . .
RUN pnpm run build

FROM nginx:alpine 

COPY --from=constructor /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
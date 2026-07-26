FROM node:lts-alpine AS constructor

WORKDIR /app
ARG VITE_API_URL
ENV CI=true
ENV VITE_API_URL=${VITE_API_URL}
COPY package*.json ./
RUN corepack enable pnpm
RUN pnpm install
COPY . .
RUN pnpm run build

FROM nginx:alpine 

COPY --from=constructor /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
FROM node:lts-alpine AS constructor

WORKDIR /app

COPY package*.json ./
COPY tsconfig.json ./

RUN npm install

COPY ./ ./

# RUN npm run build
RUN npm run build

# ALB: Configuracion de imagen productiva y deploy
FROM node:lts-alpine

WORKDIR /app

RUN addgroup -g 1001 -S nodejs && \
    adduser -S usuario-grupo6 -u 1001

COPY --from=constructor --chown=usuario-grupo6:nodejs /app/dist ./dist
COPY --from=constructor --chown=usuario-grupo6:nodejs /app/package*.json ./

RUN npm install --omit=dev && \
    npm cache clean --force

USER usuario-grupo6

EXPOSE 3000

CMD ["node", "dist/app.js"]
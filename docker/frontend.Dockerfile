# Stage 1: build
FROM node:20-alpine AS builder
WORKDIR /app

# Copiar package.json primero para aprovechar cache
COPY package*.json ./
RUN npm ci

# Copiar todo el código y el .env
COPY . .
COPY .env ./

# Variables necesarias para Vite en build-time
ENV VITE_PORTBACK=5000
ENV VITE_API_URL=http://localhost:5000/api

# Ejecutar build
RUN npm run build

# Stage 2: serve with nginx
FROM nginx:stable-alpine

# Copiar la build de Vite a Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# Copiar configuración de Nginx
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

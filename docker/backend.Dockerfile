# docker/backend.Dockerfile
FROM node:20-alpine

WORKDIR /app

# Copiamos solo package.json primero para aprovechar cache
COPY package*.json ./
RUN npm ci --only=production

# Copiamos el resto del backend
COPY . .

# Crear carpeta uploads (si la usas)
RUN mkdir -p uploads

EXPOSE 5000

# Usamos NODE_ENV=production y arrancamos con el script "start" que tienes
ENV NODE_ENV=production
CMD ["node", "src/server.js"]

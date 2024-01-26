# Dockerfile
# Stage 1: Build the application
FROM node:14 AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Create the production image
FROM node:14-alpine
WORKDIR /app
COPY --from=build /app .
EXPOSE 8080
CMD ["node", "src/server.js"]

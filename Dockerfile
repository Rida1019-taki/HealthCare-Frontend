# Stage 1: Build React app
FROM node:21.5-bullseye AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Nginx
FROM nginxinc/nginx-unprivileged:1.24-bullseye-perl

COPY --from=build /app/build /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d/default.conf

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]
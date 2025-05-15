FROM node:20-alpine as build

WORKDIR /app

COPY package*.json ./

# Instalar dependências
RUN npm install

# Atualizar Browserslist
RUN npx update-browserslist-db@latest

# Copiar o código fonte
COPY . .

# Build do projeto
RUN npm run build

# Etapa de produção
FROM nginx:alpine

# Copiar o build para o Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar a configuração personalizada do Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Expor a porta do servidor
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]

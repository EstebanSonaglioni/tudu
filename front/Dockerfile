# --- Etapa 2: Production ---
FROM nginx:stable-alpine

# Copiamos los archivos compilados desde la etapa anterior al directorio de Nginx
COPY  /dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Exponemos el puerto 80
EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
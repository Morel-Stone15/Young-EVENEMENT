# Utiliser une image légère de Nginx
FROM nginx:alpine

# Copier tous les fichiers du site dans le dossier par défaut de Nginx
COPY . /usr/share/nginx/html

# Exposer le port 80
EXPOSE 80

# Lancer Nginx
CMD ["nginx", "-g", "daemon off;"]

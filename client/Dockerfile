FROM nginxinc/nginx-unprivileged:alpine-perl
# Last updated: 2026-01-31

USER root
RUN apk upgrade --no-cache openssl busybox busybox-binsh ssl_client
USER nginx

WORKDIR /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY ./dist /usr/share/nginx/html
EXPOSE 8080
CMD ["nginx", "-g", "daemon off;"]

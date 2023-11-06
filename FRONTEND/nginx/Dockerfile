FROM nginx:1.21-alpine

RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d


RUN chmod 777 /etc/nginx/conf.d/nginx.conf
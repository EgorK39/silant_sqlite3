#FROM node:latest as builder
FROM node:latest
#
WORKDIR /usr/src/frontend
COPY package.json ./
COPY package-lock.json ./
RUN npm install -g npm@10.2.3
RUN ls -la
RUN sleep 10
RUN npm install
RUN ls -la
#CMD ["npm", "run", "start"]
# build or start

RUN sleep 5
COPY ./ ./

RUN npm run build
RUN ls -la
RUN cd dist && ls -la

# sudo docker build -f Dockerfile -t dick .
# sudo docker run -it -p 8080:8080 dick


#FROM nginx:latest
#
#
##EXPOSE 3000
##WORKDIR /usr/share/nginx/html
#WORKDIR /home/frontend
#
#
#
#RUN rm /etc/nginx/conf.d/default.conf
#COPY ./nginx/default.conf /etc/nginx/conf.d
#
#RUN chmod 777 /etc/nginx/conf.d/default.conf
#
#
##COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
#
#COPY --from=builder /usr/src/frontend/ .
##RUN ls -la
##RUN pwd


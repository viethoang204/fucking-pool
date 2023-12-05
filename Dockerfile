FROM node:18.16.0

WORKDIR /app

COPY package.json .

USER root

RUN apt-get update && apt-get install -y vim

RUN npm install

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
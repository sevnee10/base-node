FROM node:18-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json ./

RUN npm i

RUN npm i -g nodemon

COPY . .

EXPOSE 7698

CMD ["npm", "run", "dev"]

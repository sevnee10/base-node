FROM node:19-alpine

RUN mkdir -p /usr/src/app

WORKDIR /usr/src/app

COPY package.json /usr/src/app

RUN npm i

RUN npm i -g nodemon

COPY . /usr/src/app

EXPOSE 7698

CMD ["npm", "run", "dev"]

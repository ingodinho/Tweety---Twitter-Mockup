FROM node:16

WORKDIR /backend

COPY package.json /backend

RUN npm install

COPY . /backend

EXPOSE 9000

CMD ["node", "src/index.js"]
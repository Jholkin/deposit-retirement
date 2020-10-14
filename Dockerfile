FROM node:stretch-slim
WORKDIR /usr/src/app/microservice-transaction
COPY package.json .
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
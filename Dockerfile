FROM node:lts-alpine
WORKDIR /root

COPY ["package.json", "package-lock.json", "./"]

RUN npm install
COPY . .

EXPOSE 8080

CMD ["node", "server"]
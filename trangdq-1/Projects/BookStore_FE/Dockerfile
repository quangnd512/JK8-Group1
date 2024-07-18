FROM node:20.10.0

WORKDIR /app

COPY package.json .

RUN npm install -g @angular/cli@17.1.2 && npm install

COPY . .

RUN npm run build

EXPOSE 4200

CMD ["ng", "serve", "--host", "0.0.0.0"]
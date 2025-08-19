FROM node:24

WORKDIR /app

COPY . .

WORKDIR /app/packages/session

RUN npm install
RUN npm run build

EXPOSE 4001
CMD ["npm", "run", "dev"]

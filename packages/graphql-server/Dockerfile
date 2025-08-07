FROM node:24

WORKDIR /app

COPY . .

WORKDIR /app/packages/graphql-server

RUN npm install
RUN npm run build

EXPOSE 4002
CMD ["npm", "run", "dev"]

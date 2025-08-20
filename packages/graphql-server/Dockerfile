FROM node:24

RUN corepack enable

WORKDIR /app

COPY . .

RUN npm install

WORKDIR /app/packages/graphql-server
RUN npm run build

EXPOSE 4002
CMD ["npm", "run", "dev"]

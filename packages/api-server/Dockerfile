FROM node:24

RUN corepack enable

WORKDIR /app

COPY . .

RUN npm install

WORKDIR /app/packages/api-server
RUN npm run build

EXPOSE 4001
CMD ["npm", "run", "dev"]

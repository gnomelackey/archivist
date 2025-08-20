FROM node:24

RUN corepack enable

WORKDIR /app

COPY . .

RUN npm install

WORKDIR /app/apps/web
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "dev"]

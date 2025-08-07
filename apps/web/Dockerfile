FROM node:24
WORKDIR /app

COPY . .

WORKDIR /app/apps/web
RUN npm install
RUN npm run build

EXPOSE 3000
CMD ["npm", "run", "dev"]

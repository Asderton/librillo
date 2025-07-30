FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000
COPY wait-for-it.sh ./
RUN chmod +x wait-for-it.sh
CMD ["./wait-for-it.sh", "librillo_db:5432", "--", "npm", "start"]

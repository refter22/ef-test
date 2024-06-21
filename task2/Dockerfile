# базовый образ
FROM node:22

# создание рабочей директории
WORKDIR /usr/src/app

# установка зависимостей
COPY package*.json ./
RUN npm install

# копирование исходного кода
COPY . .

# сборка приложения
RUN npm run build

# открытие порта
EXPOSE 3000

ENTRYPOINT ["sh", "-c", "npm run seed && exec npm run start:prod"]

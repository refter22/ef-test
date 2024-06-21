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

# установка entrypoint, чтобы сначала выполнить initdb, а затем запустить приложение
ENTRYPOINT ["sh", "-c", "npm run initdb && exec npm run start:prod"]

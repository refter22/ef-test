# Тестовое задание

## Запуск

Проще всего использовать Docker Compose:

```bash
docker-compose up --build
```

Сборка использует образы PostgreSQL, RabbitMQ и Node.

## OpenAPI ссылки

Сервисы будут доступны по следующим ссылкам:

Service 1: [localhost:3001/api-docs](localhost:3001/api-docs)<br>
Service 2: [localhost:3002/api-docs](localhost:3002/api-docs)<br>
Service 3: [localhost:3003/api-docs](localhost:3003/api-docs)<br>

Service 1: Создаёт и редактирует пользователей<br>
Service 2: Отдаёт историю изменений пользователей<br>
Service 3: Создаёт своих пользователей и меняет флаг hasProblems<br>

Примечание: Третий сервис вставляет миллион строк в базу данных, поэтому его запуск занимает больше времени.

## Проблемы с Docker Hub в России

В данный момент Docker Hub недоступен в России. Для работы с Docker вам необходимо использовать VPN или настроить Docker на использование зеркала:

```json
"registry-mirrors": [
    "https://mirror.gcr.io/",
    "https://dockerhub.timeweb.cloud"
]
```

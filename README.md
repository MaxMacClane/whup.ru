# Whup.ru Monorepo

## Быстрый старт

1. Установи [pnpm](https://pnpm.io/):
   ```sh
   npm install -g pnpm
   ```
2. Установи зависимости:
   ```sh
   pnpm install
   ```
3. Скопируй .env.example в .env и заполни переменные:
   ```sh
   cp .env.example .env
   ```
4. Запусти инфраструктуру:
   ```sh
   docker-compose -f infra/docker/docker-compose.yml up -d
   ```
5. Запусти dev-режим (после добавления сервисов):
   ```sh
   pnpm run dev
   ```

## Структура репозитория

```
/apps
  /web         — фронтенд (Next.js)
  /api         — backend (NestJS)
  /worker      — фоновые задачи (очереди, AI)
/libs
  /ui          — общие UI-компоненты
  /utils       — утилиты
  /types       — типы
  /api-client  — общий клиент для API
/infra
  /docker      — docker-compose, Dockerfile
  /scripts     — миграции, деплой, CI/CD
```

## Окружение (docker-compose)
- **PostgreSQL + pgvector** — основная БД + векторные данные
- **Redis** — кеш, очереди
- **Minio** — объектное хранилище (файлы, обложки)
- **Qdrant** — векторная БД для поиска

## Полезные команды
- `pnpm lint` — линтинг кода
- `pnpm format` — форматирование кода
- `pnpm run dev` — запуск dev-режима (после добавления сервисов)

## CI/CD
- В проекте есть GitHub Actions для автосборки и деплоя

---

Если что-то не работает — смотри .env и docker-compose, или пиши в issues.

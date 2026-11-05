# Collaborative Library

A web application for managing and discovering books, sharing book sessions, and coordinating loans between readers. The app includes account access, book search, and map-based discovery of nearby copies.

## Technology

- **Frontend:** React, TypeScript, Vite, Redux Toolkit, and Material UI
- **Backend:** ASP.NET Core Web API and Entity Framework Core
- **Database:** PostgreSQL
- **Deployment:** Docker Compose

## Project layout

- `client/` — web application
- `server/` — API, data models, and database migrations
- `docker-compose.yml` — local service definitions

## Configuration

Create a `.env` file in the repository root with a local PostgreSQL password:

```env
DB_PASSWORD=choose-a-strong-local-password
```

The `.env` file is ignored by Git. Do not commit credentials.

## Run with Docker Compose

Clone the repository:

```sh
git clone https://github.com/altGIT999/library.git

cd library
```

After configuring the database password, start the services:

```sh
docker compose up --build
```

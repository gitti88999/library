<!-- # Collaborative Library Project

## Overview
A production-ready collaborative library system for managing books, collaborators, and shared book sessions.  
Built with ASP.NET Core Web API and Entity Framework Core.

---

## Technology Stack

| Layer | Technology |
|------|-----------|
| Backend | ASP.NET Core Web API |
| ORM | Entity Framework Core |
| Database | SQL Server |
| Language | C# |

---

## Getting Started

### Prerequisites
- .NET 6 / .NET 7 SDK
- SQL Server
- Visual Studio / VS Code

---

### Setup

Clone the repository:
```
git clone <repo-url>
cd server
```

Restore packages:
```
dotnet restore
```

---

### Database Setup

Run migrations:
```
dotnet ef database update
```

If needed, create migration:
```
dotnet ef migrations add InitialCreate
```

---

### Run Project

```
dotnet run
```

API will be available at:
```
http://localhost:5217
```

---

## Authentication Flow

| Step | Description |
|-----|------------|
| 1 | Register or Login |
| 2 | Receive JWT token |
| 3 | Use token in requests |

Authorization header:
```
Authorization: Bearer <token>
```

---

## API Endpoints

### Auth

| Method | Endpoint |
|--------|----------|
| POST | /api/Auth/register |
| POST | /api/Auth/login |
| POST | /api/Auth/google-login |

---

### Book

| Method | Endpoint |
|--------|----------|
| GET | /api/Book/books |
| POST | /api/Book |

Example request:
```
POST /api/Book
{
  "title": "Example Book",
  "authorId": "guid",
  "categoryId": "guid"
}
```

---

### BookSession

| Method | Endpoint |
|--------|----------|
| POST | /api/BookSession |
| PUT | /api/BookSession/{id} |
| PUT | /api/BookSession/{id}/archiveAndDelete |

---

### Collaborator

| Method | Endpoint |
|--------|----------|
| GET | /api/Collaborator/{collaboratorId}/booksessions |

Example:
```
GET http://localhost:5217/api/Collaborator/{collaboratorId}/booksessions
```

---

## HTTP Status Codes

| Code | Meaning |
|------|--------|
| 200 | OK |
| 201 | Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 404 | Not Found |
| 500 | Server Error |

---

## Health Check

| Method | Endpoint |
|--------|----------|
| GET | /health |

---

## Project Structure

```
/server
  /Controllers
  /Models
  /DTOs
  /Services
  /Data
```

---

## Schemas

| Schema | Description |
|--------|------------|
| Audience | Audience entity |
| Author | Author entity |
| Book | Book entity |
| BookDTO | Book transfer object |
| BookSession | Session entity |
| Category | Category entity |
| Collaborator | Collaborator entity |
| CollaboratorDTO | Collaborator transfer object |
| GoogleLoginDto | Google login payload |
| LoginDTO | Login payload |

---

## Notes

- Uses JWT authentication
- Clean separation between layers
- RESTful API design
- Scalable architecture -->
<!-- # Collaborative Library Project - Dockerized

## Overview
Production-ready system running fully in Docker:
SQL Server + ASP.NET Core API + Front-end client.

---

## Technology Stack
Backend: ASP.NET Core Web API  
ORM: Entity Framework Core  
Database: SQL Server  
Frontend: React  
Containerization: Docker + Docker Compose  

---

## Prerequisites
- Docker
- Docker Compose

---

## Getting Started

Clone repository:

git clone <repo-url>
cd project-root

Run system:

docker-compose up --build

---

## Services

DB: localhost:1434  
API: localhost:5217  
Client: localhost:5173  

---

## Authentication Flow

1. Register or login
2. Receive JWT token
3. Use token in requests

Authorization header:

Authorization: Bearer <token>

---

## API Endpoints

Auth:
POST /api/Auth/register
POST /api/Auth/login
POST /api/Auth/google-login

Book:
GET /api/Book/books
POST /api/Book

BookSession:
POST /api/BookSession
PUT /api/BookSession/{id}
PUT /api/BookSession/{id}/archiveAndDelete

Collaborator:
GET /api/Collaborator/{collaboratorId}/booksessions

Health:
GET /health

---

## Project Structure

/client
/server
/docker-compose.yml

---

## Notes

- Fully Dockerized
- JWT authentication
- REST API
- Clean architecture -->
# Collaborative Library Project

## Overview
A production-ready collaborative library system for managing books, collaborators, and shared book sessions.  
Built with ASP.NET Core Web API, Entity Framework Core, SQL Server, and fully containerized with Docker.

---

## Technology Stack

Backend: ASP.NET Core Web API  
ORM: Entity Framework Core  
Database: SQL Server  
Frontend: React  
Containerization: Docker + Docker Compose  
Language: C#

---

## Getting Started

### Prerequisites
- Docker
- Docker Compose

---

### Run the Project

Clone repository:

git clone <repo-url>
cd project-root

Start services:

docker-compose up --build

---

## Services

API: http://localhost:5217  
Client: http://localhost:5173  
Database: localhost:1434  

---

## Authentication Flow

1. Register or login
2. Receive JWT token
3. Use token in requests

Authorization header:

Authorization: Bearer <token>

---

## API Endpoints

### Auth
POST /api/Auth/register
POST /api/Auth/login
POST /api/Auth/google-login

Example request:
{
  "email": "user@example.com",
  "password": "Password123!"
}

---

### Book
GET /api/Book/books
POST /api/Book

Example request:
{
  "title": "Example Book",
  "authorId": "00000000-0000-0000-0000-000000000000",
  "categoryId": "00000000-0000-0000-0000-000000000000"
}

---

### BookSession
POST /api/BookSession
PUT /api/BookSession/{id}
PUT /api/BookSession/{id}/archiveAndDelete

Example request:
{
  "bookId": "00000000-0000-0000-0000-000000000000",
  "collaboratorIds": [
    "00000000-0000-0000-0000-000000000000"
  ]
}

---

### Collaborator
GET /api/Collaborator/{collaboratorId}/booksessions

---

### Health Check
GET /health

---

## Docker Setup

version: "3.9"

services:

  db:
    image: mcr.microsoft.com/mssql/server:2022-latest
    environment:
      ACCEPT_EULA: "Y"
      MSSQL_SA_PASSWORD: "ALTgit88999"
    ports:
      - "1434:1433"
    volumes:
      - sql_data:/var/opt/mssql

  server:
    build:
      context: ./server
    ports:
      - "5217:5217"
    environment:
      ASPNETCORE_URLS: http://+:5217
      ConnectionStrings__libraryDB: Server=db,1433;Database=libraryDB;User Id=sa;Password=ALTgit88999;TrustServerCertificate=true
    depends_on:
      - db

  client:
    build:
      context: ./client
    ports:
      - "5173:5173"
    depends_on:
      - server

volumes:
  sql_data:

---

## HTTP Status Codes

200 OK  
201 Created  
400 Bad Request  
401 Unauthorized  
404 Not Found  
500 Server Error  

---

## Project Structure

/server
/client
/docker-compose.yml

---

## Notes

- Fully Dockerized system
- JWT authentication enabled
- REST API architecture
- Clean separation between layers
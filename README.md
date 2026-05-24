# Collaborative Library Project

## Overview
This project implements a collaborative library system where multiple users can manage, track, and share books. Built with ASP.NET Core and Entity Framework Core.

## Features
- CRUD operations for Books.
- Manage Collaborators.
- Create BookSessions for collaborative work.
- Validation of BookId and CollaboratorId before creating sessions.

## Technology Stack
- ASP.NET Core Web API
- Entity Framework Core
- SQL Server (or any compatible relational database)
- C#

## API Endpoints & Examples

### Books
- `GET /api/books` – List all books.

```http
GET /api/books HTTP/1.1
Host: localhost:5000
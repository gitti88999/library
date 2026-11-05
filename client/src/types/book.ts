export interface BookDTO {
  id: string;
  name: string;
  categoryId: string;
  audienceId: string;
  authorId: string;
  collaboratorId?: string;
}

export interface BookSessionDTO {
  book: BookDTO;
  bookSessionId: string;
  enabled: boolean;
  status?: string;
}

export interface Audience {
  id: string;
  name: string;
}

export interface Author {
  id: string;
  name: string;
}

export interface Category {
  id: string;
  name: string;
}

export interface AddBookParams {
  book: BookDTO;
  collaboratorId: string;
}

export enum BooksStatus {
  Idle = "idle",
  Loading = "loading",
  Succeeded = "succeeded",
  Failed = "failed",
}

export interface Book {
  id: string;
  name: string;
}

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
}
export interface Audience {
  Id: string;
  Name: string;
}
export interface Author {
  Id: string;
  Name: string;
}
export interface Category {
  Id: string;
  Name: string;
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

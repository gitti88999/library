export interface BookDTO {
  id: string; // <-- הוסיפי
  name: string;
  categoryId: string;
  audienceId: string;
  authorId: string;
  collaboratorId?: string; // <-- הוסף את זה

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
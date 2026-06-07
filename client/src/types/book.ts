export interface BookDTO {
  name: string;
  category: number;
  audienceId: string;
  authorId: number;
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
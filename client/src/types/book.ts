export interface BookDTO {
  name: string;
  category: number;
  audienceId: number;
  authorId: number;
}
export interface BookSessionDTO {
  book: BookDTO;
  bookSessionId: string;
  enabled: boolean;
}
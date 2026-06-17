// src/types/user.ts
import type { BookDTO } from "./book";
import type { Book } from "./book";

// export interface User {
//     id: string;
//     name: string;
//     email: string;
//     books: BookDTO[];
//     latitude: number;
//     longitude: number;
    
// }

export interface User {
  id: string;
  name: string;
  email: string;
  books: Book[];
  latitude: number;
  longitude: number;
}
export interface NewUser {
  name: string;
  email: string;
  password: string;
  latitude: number;
  longitude: number;
}
export interface UserResponse {
  collaboratorId: string;
  name: string;
  email: string;
  latitude: number;
  longitude: number;
  token?: string;
}

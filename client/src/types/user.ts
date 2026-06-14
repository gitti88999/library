// src/types/user.ts
import type { Book } from "./book";

export interface User {
    id: string;
    name: string;
    email: string;
    books: Book[];
    latitude: number;
    longitude: number;
    
}
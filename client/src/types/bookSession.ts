export interface Collaborator {
    collaboratorId: string;
    name: string;
    latitude: number;
    longitude: number;
}

export interface BookSession {
    id: string;
    bookId: string;
    enabled: boolean;
    collaborator: Collaborator;
}

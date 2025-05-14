export interface Book {
  id: string;
  title: string;
  releaseYear?: number;
  authorId: string;
}

export interface Author {
  id: string;
  name: string;
}

export interface ErrorMessage {
  message: string;
  errorCode: number;
}

export interface SuccessMessage {
  message: string;
}

// Mock data store
export const books: Book[] = [
  { id: '1', title: 'The Great Gatsby', releaseYear: 1925, authorId: '1' },
  { id: '2', title: 'To Kill a Mockingbird', releaseYear: 1960, authorId: '2' },
  { id: '3', title: 'Go Set a Watchman', releaseYear: 2015, authorId: '2' },
];

export const authors: Author[] = [
  { id: '1', name: 'F. Scott Fitzgerald' },
  { id: '2', name: 'Harper Lee' },
];
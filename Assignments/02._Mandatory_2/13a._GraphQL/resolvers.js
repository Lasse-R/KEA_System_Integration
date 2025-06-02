import { v4 as uuid } from 'uuid';

const authors = [
  { id: '1', name: 'George Orwell' },
  { id: '2', name: 'J.K. Rowling' },
];

let books = [
  { id: '101', title: '1984', releaseYear: 1949, authorId: '1' },
  { id: '102', title: 'Harry Potter', releaseYear: 1997, authorId: '2' },
];

const resolvers = {
  Query: {
    books: () => books,
    book: (_, { id }) => books.find(book => book.id === id),
    authors: () => authors,
    author: (_, { id }) => authors.find(author => author.id === id),
  },

  Mutation: {
    createBook: (_, { authorId, title, releaseYear }) => {
      const newBook = { id: uuid(), title, releaseYear, authorId };
      books.push(newBook);
      return newBook;
    },

    updateBook: (_, { id, authorId, title, releaseYear }) => {
      const book = books.find(b => b.id === id);
      if (!book) return null;
      if (authorId !== undefined) book.authorId = authorId;
      if (title !== undefined) book.title = title;
      if (releaseYear !== undefined) book.releaseYear = releaseYear;
      return book;
    },

    deleteBook: (_, { id }) => {
      books = books.filter(book => book.id !== id);
      return { message: 'Book deleted successfully' };
    },
  },

  Book: {
    author: (book) => authors.find(author => author.id === book.authorId),
  },

  Author: {
    books: (author) => books.filter(book => book.authorId === author.id),
  },
};

export default resolvers;

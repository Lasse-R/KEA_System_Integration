import { PubSub } from 'graphql-subscriptions';
import { Book, Author, SuccessMessage, books, authors } from './models.js';

// Create PubSub instance for subscriptions
export const pubsub = new PubSub();
export const BOOK_ADDED = 'BOOK_ADDED';

export const resolvers = {
  Query: {
    books: (): Book[] => books,
    book: (_: any, { id }: { id: string }): Book | undefined => 
      books.find(book => book.id === id),
    authors: (): Author[] => authors,
    author: (_: any, { id }: { id: string }): Author | undefined => 
      authors.find(author => author.id === id),
  },
  
  Mutation: {
    createBook: (_: any, { authorId, title, releaseYear }: { authorId: string, title: string, releaseYear?: number }): Book => {
      // Check if author exists
      const authorExists = authors.some(author => author.id === authorId);
      if (!authorExists) {
        throw new Error(`Author with ID ${authorId} not found`);
      }
      
      // Create new book
      const newBook: Book = {
        id: String(books.length + 1),
        title,
        releaseYear,
        authorId,
      };
      
      // Add to books array
      books.push(newBook);
      
      // Publish subscription event
      pubsub.publish(BOOK_ADDED, { bookAdded: newBook });
      
      return newBook;
    },
    
    updateBook: (_: any, { id, authorId, title, releaseYear }: { id: string, authorId?: string, title?: string, releaseYear?: number }): Book => {
      const bookIndex = books.findIndex(book => book.id === id);
      
      if (bookIndex === -1) {
        throw new Error(`Book with ID ${id} not found`);
      }
      
      // Check author if provided
      if (authorId) {
        const authorExists = authors.some(author => author.id === authorId);
        if (!authorExists) {
          throw new Error(`Author with ID ${authorId} not found`);
        }
      }
      
      // Update book
      const updatedBook: Book = {
        ...books[bookIndex],
        ...(title !== undefined && { title }),
        ...(releaseYear !== undefined && { releaseYear }),
        ...(authorId !== undefined && { authorId }),
      };
      
      books[bookIndex] = updatedBook;
      
      return updatedBook;
    },
    
    deleteBook: (_: any, { id }: { id: string }): SuccessMessage => {
      const bookIndex = books.findIndex(book => book.id === id);
      
      if (bookIndex === -1) {
        throw new Error(`Book with ID ${id} not found`);
      }
      
      // Remove book
      books.splice(bookIndex, 1);
      
      return {
        message: `Book with ID ${id} successfully deleted`,
      };
    },
  },
  
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator([BOOK_ADDED]),
    },
  },
  
  // Field resolvers
  Book: {
    author: (parent: Book): Author | undefined => 
      authors.find(author => author.id === parent.authorId),
  },
  
  Author: {
    books: (parent: Author): Book[] => 
      books.filter(book => book.authorId === parent.id),
  },
};
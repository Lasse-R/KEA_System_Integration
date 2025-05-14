# GraphQL Server with Apollo and TypeScript

This project implements a GraphQL server using Apollo Server, TypeScript, and ES modules. It provides a complete implementation of the provided schema with Query, Mutation, and Subscription functionality.

## Features

- **Modern TypeScript** with ES Modules (No CommonJS)
- **Apollo Server 4** with Express integration
- **GraphQL Subscriptions** via WebSockets
- **Schema-first** approach with external GraphQL schema file
- In-memory data store for books and authors

## Project Structure

```
├── schema.graphql       # GraphQL schema definition
├── src/
│   ├── index.ts         # Server setup and entry point
│   ├── models.ts        # TypeScript interfaces and mock data
│   ├── resolvers.ts     # GraphQL resolvers implementation
│   └── schema.ts        # Schema loader
├── package.json         # Project dependencies
└── tsconfig.json        # TypeScript configuration
```

## Getting Started

### Prerequisites

- Node.js (v16+)
- npm or yarn

### Installation

1. Clone this repository
2. Install dependencies:
   ```
   npm install
   ```
   or
   ```
   yarn install
   ```

3. Place the `schema.graphql` file in the root directory of the project.

### Development

Run the server in development mode with hot reloading:

```
npm run dev
```

### Production Build

Build the TypeScript code:

```
npm run build
```

Start the production server:

```
npm start
```

## GraphQL Endpoint

- **HTTP Endpoint**: http://localhost:4000/graphql
- **WebSocket Endpoint**: ws://localhost:4000/graphql

## Testing the API

You can test the GraphQL API using:

1. Apollo Studio Explorer (available at the HTTP endpoint)
2. GraphQL Playground
3. Postman or any other REST client
4. A custom frontend application

### Example Queries

#### Get all books with authors:
```graphql
query GetAllBooks {
  books {
    id
    title
    releaseYear
    author {
      id
      name
    }
  }
}
```

#### Get a specific book:
```graphql
query GetBook($id: ID!) {
  book(id: $id) {
    id
    title
    releaseYear
    author {
      name
    }
  }
}
```

### Example Mutations

#### Create a new book:
```graphql
mutation CreateBook($authorId: ID!, $title: String!, $releaseYear: Int) {
  createBook(authorId: $authorId, title: $title, releaseYear: $releaseYear) {
    id
    title
    releaseYear
    author {
      name
    }
  }
}
```

#### Update a book:
```graphql
mutation UpdateBook($id: ID!, $title: String) {
  updateBook(id: $id, title: $title) {
    id
    title
    releaseYear
  }
}
```

#### Delete a book:
```graphql
mutation DeleteBook($id: ID!) {
  deleteBook(id: $id) {
    message
  }
}
```

### Example Subscription

#### Subscribe to new books:
```graphql
subscription BookAdded {
  bookAdded {
    id
    title
    releaseYear
    author {
      name
    }
  }
}
```
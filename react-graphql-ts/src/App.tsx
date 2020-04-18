import React from 'react';
import BooksContainer from './components/books';
import { IBook, IAuthor } from "./interfaces";
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import BookForm from './components/book-form';
import AuthorsContainer from './components/authors';
import AuthorForm from './components/author-form';

const GET_BOOKS = gql`
query {
  getBooks {
    id
    name
    author {
      name
    }
  }
}
`;

const GET_AUTHORS = gql`
query {
  getAuthors {
    id
    name
  }
}
`;

function App() {
  const book_data = useQuery(GET_BOOKS);
  const author_data = useQuery(GET_AUTHORS);
  let books: IBook[] = [];
  let authors: IAuthor[] = [];
  if (!book_data.loading && !author_data.loading) {
    books = book_data.data.getBooks;
    authors = author_data.data.getAuthors;
  }
  return (
    <div>
      {
        (book_data.loading || author_data.loading) ? (<p>cargando...</p>) : (
          <div style={{
            display: 'flex',
            flexDirection: "row",
          }}>
            <div style={{
              margin: '10px',
              display: 'flex',
              flexDirection: 'column',
              flex: 1
            }}>
              <h1>Authors</h1>
              <AuthorForm></AuthorForm>
              <AuthorsContainer authors={authors} />
            </div>
            <hr/>
            <div style={{
              margin: '10px',
              display: 'flex',
              flexDirection: 'column',
              flex: 1
            }}>
              <h1>Books</h1>
              <BookForm></BookForm>
              <BooksContainer books={books} />
            </div>
          </div>
        )
      }
    </div>
  );
}

export default App;

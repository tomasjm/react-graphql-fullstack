import React from 'react';
import BooksContainer from './components/books';
import { IBook } from "./interfaces";
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

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

function App() {
  const { loading, data } = useQuery(GET_BOOKS);
  let books: IBook[] = [];
  (!loading) && (books = data.getBooks);
  return (
    <div>
      {
        (loading) ? (<p>cargando...</p>) : (<BooksContainer books={books} />)
      }
    </div>
  );
}

export default App;

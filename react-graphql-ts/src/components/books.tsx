import React, { useEffect, useState } from 'react';
import { IBook, IBookContainer } from "../interfaces";
import { useSubscription } from "@apollo/react-hooks";
import gql from 'graphql-tag';

const BOOKS_SUBSCRIPTIONS = gql`
  subscription {
    onNewBook {
        id
        name
        author {
            id
            name
        }
    }
  }`;

function BooksContainer({ books }: IBookContainer) {
    const [state, setState] = useState<IBook[]>(books);
    const { data } = useSubscription(BOOKS_SUBSCRIPTIONS);
    const [newBook, setNewBook] = useState<boolean>(false);

    useEffect(() => {
        if (data) {
            let { onNewBook } = data;
            setState((state: IBook[]) => [...state, onNewBook]);
            setNewBook(true);
        }
    }, [data]);
    useEffect(() => {
        if (newBook) {
            setTimeout(() => { setNewBook(false) }, 3000);
        }
    }, [newBook])
    return (
        <div>
            <div>
                {
                    (newBook) ? <p style={{ color: 'red' }}>A new book has been published!</p> : null
                }
            </div>
            <BookList books={state} />
        </div>
    );
}

function BookList({ books }: { books: IBook[] }) {
    return (
        <div>
            {
                [...books].reverse().map((book: IBook) => (
                    <div style={{
                        margin: '25px 5px',
                        padding: '10px',
                        borderRadius: '6px',
                        boxShadow: '2px 2px 8px 0 rgba(0,0,0,0.4)'
                    }} key={book.id}>
                        <p
                        style={{
                            fontWeight: 'bold',
                            fontSize: '1.6rem',
                            textAlign: 'center'
                        }}
                        >Name of book: {book.name}</p>
                        <p
                        style={{
                            fontWeight: 'bold',
                            fontSize: '1.6rem',
                            textAlign: 'center'
                        }}
                        >Author: {book.author?.name}</p>
                    </div>

                ))
            }
        </div>
    );
}
export default BooksContainer;
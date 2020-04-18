import React, { useEffect, useState } from 'react';
import { IBook, IAuthorContainer, IAuthor } from "../interfaces";
import { useSubscription } from "@apollo/react-hooks";
import gql from 'graphql-tag';

const AUTHORS_SUBSCRIPTIONS = gql`
  subscription {
    onNewAuthor {
        id
        name
    }
  }`;

function AuthorsContainer({ authors }: IAuthorContainer) {
    const [state, setState] = useState<IAuthor[]>(authors);
    const { data } = useSubscription(AUTHORS_SUBSCRIPTIONS);
    const [newAuthor, setNewAuthor] = useState<boolean>(false);

    useEffect(() => {
        if (data) {
            let { onNewAuthor } = data;
            console.log([...state, onNewAuthor])
            setState((state: IAuthor[]) => [...state, onNewAuthor]);
            setNewAuthor(true);
        }
    }, [data]);
    useEffect(() => {
        if (newAuthor) {
            setTimeout(() => { setNewAuthor(false) }, 3000);
        }
    }, [newAuthor])
    return (
        <div>
            <div>
                {
                    (newAuthor) ? <p style={{ color: 'red' }}>A new author has been registered!</p> : null
                }
            </div>
            <AuthorList authors={state} />
        </div>
    );
}

function AuthorList({ authors }: { authors: IAuthor[] }) {
    return (
        <div>
            {
                [...authors].reverse().map((author: IAuthor) => (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        margin: '25px 5px',
                        padding: '10px',
                        borderRadius: '6px',
                        boxShadow: '2px 2px 8px 0 rgba(0,0,0,0.4)'
                    }} key={author.id}>
                        <p 
                        style={{
                            fontWeight: 'bold',
                            fontSize: '1.3rem',
                        }}
                        >ID: {author.id}</p>
                        <p
                        style={{
                            marginLeft: '2.5rem',
                            fontWeight: 'bold',
                            fontSize: '1.6rem',
                        }}
                        >Name: {author.name}</p>
                    </div>

                ))
            }
        </div>
    );
}
export default AuthorsContainer;
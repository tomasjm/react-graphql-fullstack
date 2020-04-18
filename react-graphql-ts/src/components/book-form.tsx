import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

const ADD_BOOK = gql`
mutation AddBook($authorId: Float!, $name: String!) {
    addBook(authorId: $authorId, name: $name) {
      id
    }
  }
`;

function BookForm() {
    let [state, setState] = useState({
        name: "",
        authorId: 0
    });
    const [addBook, { data }] = useMutation(ADD_BOOK);
    return (
        <div>
            <form
            style={{
              borderRadius: '6px',
              boxShadow: '2px 2px 8px 0 rgba(0,0,0,0.4)',
              padding: "15px 15px",
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-around',
              width: '33%',
              margin: '0 auto'
            }}
        onSubmit={async e => {
          e.preventDefault();
          addBook({ variables: { authorId: state.authorId, name: state.name } });
          setState({
              name: '',
              authorId: 0
          })
        }}
      >
          <p style={{ fontWeight: 'bold' }}>Add new Book</p>
          <input 
          style={{
            borderRadius: "3px",
            padding: "5px 3px",
            border: '1px solid rgba(0,0,0,0.4)',
            marginBottom: '10px'
          }}
          value={(!state.authorId) ? '' : state.authorId}  placeholder="Author id" onChange={ (e) => {
              let authorId: number = parseInt(e.target.value) as number;
              setState({
                  name: state.name,
                  authorId
              })
          }}/>

        <input
        style={{
          borderRadius: "3px",
          padding: "5px 3px",
          border: '1px solid rgba(0,0,0,0.4)',
          marginBottom: '10px'
        }}
        value={state.name} placeholder="Book name" onChange={ (e) => {
              let name: string = e.target.value;
              setState({
                  name,
                  authorId: state.authorId
              })
          }}/>
        <button 
        style={{
          backgroundColor: "#00b894",
          border: 'none',
          color: 'white',
          padding: '10px 5px',
        }}
        type="submit">Add book</button>
      </form>
        </div>
    );
}

export default BookForm;
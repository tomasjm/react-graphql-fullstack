import React, { useState, useEffect } from 'react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { NONAME } from 'dns';

const ADD_AUTHOR = gql`
mutation AddAuthor($name: String!) {
    addAuthor(name: $name) {
      id
    }
  }
`;

function AuthorForm() {
    let [name, setName] = useState<string>('');
    const [addAuthor, { data }] = useMutation(ADD_AUTHOR);
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
          addAuthor({ variables: { name } });
          setName('')
        }}
      >
        <p style={{ fontWeight: 'bold' }}>Add new Author</p>
        <input 
        style={{
          borderRadius: "3px",
          padding: "5px 3px",
          border: '1px solid rgba(0,0,0,0.4)',
          marginBottom: '10px'
        }}
        value={name}  placeholder="Author name" onChange={ (e) => {
              let name: string = e.target.value;
              setName(name);
          }}/>
        <button 
        style={{
          backgroundColor: "#00b894",
          border: 'none',
          color: 'white',
          padding: '10px 5px',
        }}
        type="submit">Add Author</button>
      </form>
        </div>
    );
}

export default AuthorForm;
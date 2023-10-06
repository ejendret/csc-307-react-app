// src/MyApp.js
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Table from './Table';
import Form from './Form';

function MyApp() {
  const [characters, setCharacters] = useState([]);

  async function removeOneCharacter(index) {
    try {
      // Get the user to delete and make a request using id
      const userToDelete = characters[index];
      const response = await axios.delete('http://localhost:8000/users/' + userToDelete.id)

      // On success, filter the character from frontend list and call setCharacters
      if (response.status === 204) {
        const updated = characters.filter((character, i) => {
          return character._id !== userToDelete._id
        });
        setCharacters(updated);

        // Don't think I'm actually using this but it's here
        return updated;
      }
      // Shouldn't happen since non-existent users shouldn't show on front-end
      else if (response.satus === 404) {
        // Got this from ChatGPT, understanding is that it will trigger the catch error and log error to console, wherever that is
        throw new Error('Resource not found');
      }
      else {
        throw new Error('Failed to delete user');
      }
    }
    catch (error) {
      // Just copying fetchAll format
      console.log(error)
      return false;
    }
  }

  // Backend link functions
  async function fetchAll() {
    try {
      const response = await axios.get('http://localhost:8000/users');
      return response.data.users_list;
    }
    catch (error) {
      //We're not handling errors. Just logging into the console.
      console.log(error);
      return false;
    }
  }

  useEffect(() => {
    fetchAll().then(result => {
      if (result)
        setCharacters(result);
    });
  }, []);

  async function makePostCall(person) {
    try {
      const response = await axios.post('http://localhost:8000/users', person);

      // Access the backend-generated id and append that to person
      person._id = response.data._id;
      return response;
    }
    catch (error) {
      console.log(error);
      return false;
    }
  }

  function updateList(person) {
    makePostCall(person).then(result => {
      if (result && result.status === 201)
        setCharacters([...characters, person]);
    });
  }

  return (
    <div className="container">
      <Table characterData={characters}
        removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList} />
    </div>
  )
}

export default MyApp;

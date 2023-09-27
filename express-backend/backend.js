// backend.js
import express from "express";

const app = express();
const port = 8000;

app.use(express.json());

// Root Endpoint
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// User Endpoint
app.get('/users', (req, res) => {
    const name = req.query.name;
    if (name != undefined){
        let result = findUserByName(name);
        result = {users_list: result};
        res.send(result);
    }
    else{
        res.send(users);
    }
});

const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}

// User ID Endpoints
app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = {users_list: result};
        res.send(result);
    }
});

function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

// Users
const users = {
   users_list :
   [
      {
         id : 'xyz789',
         name : 'Charlie',
         job: 'Janitor',
      },
      {
         id : 'abc123',
         name: 'Mac',
         job: 'Bouncer',
      },
      {
         id : 'ppp222',
         name: 'Mac',
         job: 'Professor',
      },
      {
         id: 'yat999',
         name: 'Dee',
         job: 'Aspring actress',
      },
      {
         id: 'zap555',
         name: 'Dennis',
         job: 'Bartender',
      }
   ]
}
// backend.js
import express from "express";

const app = express();
const port = 8000;

app.use(express.json());

// Root Endpoint
// Get
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// User Endpoint
// Get
app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined && job != undefined){
        let result = findUserByNameAndJob(name, job);
        result = {users_list: result};
	res.send(result);
    }
    else if (job != undefined){
        let result = findUserByJob(job);
	result = {users_list: result};
	res.send(result);
    }
    else if (name != undefined){
        let result = findUserByName(name);
	result = {users_list: result};
	res.send(result);
    }
    else {
        res.send(users);
    }
});

// Post
app.post('/users', (req, res) => {
    const userToAdd = req.body;
    addUser(userToAdd);
    res.status(200).end();
});

// Helper
const findUserByName = (name) => { 
    return users['users_list'].filter( (user) => user['name'] === name); 
}

const findUserByJob = (job) => { 
    return users['users_list'].filter( (user) => user['job'] === job); 
}

const findUserByNameAndJob = (name, job) => { 
    return users['users_list'].filter( (user) => user['name'] === name).filter( (user) => user['job'] === job);
}
function addUser(user){
    users['users_list'].push(user);
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

app.delete('/users/:id', (req, res) => {
    const id = req.params['id'];
    let result = findIndexById(id);
    if (result === undefined || result.length == 0)
	res.status(404).send('Resource not found.');
    else {
    	users['users_list'].splice(result, 1);
    }
});

// Helper
function findUserById(id) {
    return users['users_list'].find( (user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

function findIndexById(id){
    return users['users_list'].findIndex( (user) => user['id'] === id); // or line below
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

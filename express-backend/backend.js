// backend.js
// Setup
// Imports
import express from "express";
import cors from "cors";
import { v4 as uuidv4 } from "uuid";

// Constants
const app = express();
const port = 8000;

// App use stuff
app.use(cors());
app.use(express.json());

// App listen
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});

// Endpoints
// Root
// Get request
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Users
// Get request
app.get('/users', (req, res) => {
    const name = req.query.name;
    const job = req.query.job;
    if (name != undefined && job != undefined) {
        let result = findUserByNameAndJob(name, job);
        result = { users_list: result };
        res.send(result);
    }
    else if (job != undefined) {
        let result = findUserByJob(job);
        result = { users_list: result };
        res.send(result);
    }
    else if (name != undefined) {
        let result = findUserByName(name);
        result = { users_list: result };
        res.send(result);
    }
    else {
        res.send(users);
    }
});

// Post request
app.post('/users', (req, res) => {
    // Get user to and add unique id, got the uuidv4 function off the internet
    const userToAdd = req.body;
    const uniqueId = uuidv4();
    userToAdd.id = uniqueId;
    addUser(userToAdd);
    // Don't really know if the .end part is neccessary, definitely want to send 201 status and user as added to backend
    res.status(201).send(userToAdd).end();
});

// User Id
// Get request
app.get('/users/:id', (req, res) => {
    const id = req.params['id']; //or req.params.id
    let result = findUserById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        result = { users_list: result };
        res.send(result);
    }
});

// Delete request
app.delete('/users/:id', (req, res) => {
    const id = req.params['id'];
    let result = findIndexById(id);
    if (result === undefined || result.length == 0)
        res.status(404).send('Resource not found.');
    else {
        users['users_list'].splice(result, 1);
        res.status(204).end();
    }
});

// HELPER FUNCTIONS
// Given a name, filters the user list for users with matching name, returns filtered list
const findUserByName = (name) => {
    return users['users_list'].filter((user) => user['name'] === name);
}

// Given a job, filters the user list for users with matching jobs, returns filtered list
const findUserByJob = (job) => {
    return users['users_list'].filter((user) => user['job'] === job);
}

// Given a job and name, filters the user list for users with matching jobs and names, returns filtered list
const findUserByNameAndJob = (name, job) => {
    return users['users_list'].filter((user) => user['name'] === name).filter((user) => user['job'] === job);
}

// Given an id, returns the first user that matches, id should be unique
function findUserById(id) {
    return users['users_list'].find((user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

// Given an id, returns the index of the user that matches id
function findIndexById(id) {
    return users['users_list'].findIndex((user) => user['id'] === id); // or line below
    //return users['users_list'].filter( (user) => user['id'] === id);
}

// Pushes a user to the users_list
function addUser(user) {
    users['users_list'].push(user);
}

// Data
const users = {
    users_list:
        [
            {
                id: 'xyz789',
                name: 'Charlie',
                job: 'Janitor',
            },
            {
                id: 'abc123',
                name: 'Mac',
                job: 'Bouncer',
            },
            {
                id: 'ppp222',
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

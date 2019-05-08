// implement your API here
// Add Express
const express = require('express');
const db = require('./data/db.js')

//Create express application using the express module

const server = express();
server.use(express.json())

server.get('/', (req, res) => {
  res.send('Hello World');
});


server.listen(9090, () =>{
  console.log('listening on port 9090');
});
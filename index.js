// implement your API here
// Add Express
const express = require('express');
const db = require('./data/db.js')

//Create express application using the express module

const server = express();
server.use(express.json())

server.get('/users', (req, res) => {
  db.find()
    .then(user => {
      res.status(200).json(user);
    })
    .catch(error =>{
      res.status(500).json({error: err, message: 'whoops!'})
  })
})

server.post('/api/users', (req, res) => {
  const newUser = req.body
  console.log('req.body', req.body);
  db.add(newUser)
    .then(addedUser => {
      // 201 status is added when new user
      res.status(201).json(addedUser)
      })
    .catch(({code, message}) => {
    res.status(code).json({ err: message });
  });
});

server.get('/api/users/:id', (req, res) =>{
  const userId = req.params.id
  db.findById(userId)
    .then(user =>{
        if(user){
          db.findById(userId) .then( finduser =>{
              res.status(201).json(finduser)
          })
        } else {
          res.status( 404).json( {error : err, message :" The user with the secified ID does not exist" })
        }
      })
    .catch(error =>{
      res.status(500).json({ error : err, message: 'The user information could not be retrieved'})
    })
})


server.listen(9090, () =>{
  console.log('listening on port 9090');
});
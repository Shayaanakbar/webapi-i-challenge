// implement your API here
// Add Express
const express = require('express');
const db = require('./data/db.js')
const morgan = require ('morgan');

//Create express application using the express module

const server = express();
server.use(morgan('dev'))

//middleware
server.use(express.json())


//READ
server.get('/api/users', (req, res) => {
  db.find()
    .then(user => {
      // this defaults 200 status
      res.status(200).json(user);
    })
    .catch(({code, message}) => {
    res.status(code).json({message: "It broke"});
  })
})


// CREATE
server.post('/api/users', (req, res) => {
  const {name, bio } = req.body
  if (!name) {
    res.status(400).json({ message:"need to provide name"})
  }
  db.insert({name, bio})
    .then(addedUser => {
      // 201 status is added when new user
      res.status(201).json(addedUser)
      })
    .catch(({code, message}) => {
    res.status(code).json({ err: message });
  });
});

server.get('/api/users/:id', (req, res) =>{
  const { id } = req.params
  db.findById(id)
    .then(user =>{
        if(user){
          res.status(200).json(user);
        } else {
          res.status( 404).json( {message :" The user with the secified ID does not exist" })
        }
      })
    .catch(({code, message}) => {
      res.status(code).json({ err: message });
    })
})


// DELETE
server.delete('/api/users/:id', (req, res)=>{
  const { id } = req.params
  db.remove(id)
    .then(removedUser =>{
      if(removedUser) {
        res.status(200).json(removedUser);
      } else {
        res.status(404).json({mesage : "USER DOESNT EXIST"})
      }
    })
    .catch(({code, message}) => {
      res.status(code).json({ err: message });
    });
});

server.put('/api/users/:id', (req, res) => {
  const {id} = req.params;
  const {changes} = req.body;

  db.update({id, changes})
    .then(updatedUsers => {
      if (updatedUsers) {
        res.json(updatedUsers);
      } else {
        res.status(404).json({message: 'incorrect user'});
      }
    })
    .catch(({code, message}) => {
      res.status(code).json({err: message});
    });
});

server.listen(9090, () =>{
  console.log('listening on port 9090');
});
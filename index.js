// implement your API here
// Add Express
const express = require('express');
const db = require('./data/db.js')

//Create express application using the express module

const server = express();

//middleware
server.use(express.json())


//READ
server.get('/users', (req, res) => {
  db.find()
    .then(user => {
      res.status(200).json(user);
    }).catch(({code, message}) => {
    res.status(code).json({err: message});
  })
})


// CREATE
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
          db.findById(userId)
            .then( finduser =>{
              res.status(201).json(finduser)
          })
        } else {
          res.status( 404).json( {error : err, message :" The user with the secified ID does not exist" })
        }
      })
    .catch(({code, message}) => {
      res.status(code).json({ err: message });
    })
})


// DELETE
server.delete('/api/users/:id', (req, res)=>{
  const { id } = req.params.id

  db.remove(id)
    .then(removedUser =>{
      if(removedUser){
        db.remove(UserId).then(
          removeruser => {
            res.status(201).json(removeruser)
          })
      }else{
        res.status(404).json({ error: err, mesage : "USER DOESNT EXIST"})
      }
    })
    .catch(({code, message}) => {
      res.status(code).json({ err: message });
    });
});



server.listen(9090, () =>{
  console.log('listening on port 9090');
});
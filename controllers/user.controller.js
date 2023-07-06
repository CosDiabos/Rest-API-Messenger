const db = require("../models/");
const User = db.User;
const sessionCont = require("../controllers/session.controller.js");
const Op = db.Sequelize.Op;
const crypto = require('crypto');
var sha1 = require('sha1');
const ULID = require('ulid')



// Create and Save a new User
exports.create = (req, res) => {

  // Validate request
  if (!req.body.phoneNumber) {
    res.status(400).send({
      message: "Missing info..."
    });
    return;
  }
  uid = ULID.ulid();
  req.body.userID = uid;
  req.body.phoneNumber = sha1(req.body.phoneNumber);
  

  //Check if user exists
  // user.findOrCreate({where: {username: 'sdepold'}, defaults: {job: 'Technical Lead JavaScript'}})
  User.findOrCreate({where: { phoneNumber: req.body.phoneNumber}, defaults: req.body })
  .then( ([user, created]) => {
      // console.log(user.get({plain:true}));
      // console.log(created);
      sessionCont.createSession(user);
      // sessionCont.createSession(user);
      res.send({
          message: "OK.",
          uid: user.userID
        });
    }).catch(err => {
      res.send({
          message: "Error finding or creating user....",
          obj: err
        });
    });

  // Save User in the database
  // User.create(req.body)
  // .then(data => {
  //     console.log(sessionCont.createSession(req.body));
  //     console.log("User session for new user created.");
  //     res.send({
  //       message: "OK!"
  //     });
  // })
  // .catch(err => {
  //     console.log(err);
  //     User.findByPk(req.body.userID)
  //     .then(data => {
  //       console.log(sessionCont.createSession(req.body));
  //       console.log("User session for current user created.");
  //     })
  //     .catch(err => {
  //       res.status(500).send({
  //         message: "Error creating session for existing user."
  //       });
  //     });
  //     console.log(err.errors);
  //   // res.status(500).send({
  //   //   message:
  //   //   "Some error occurred while creating the User. " + err.errors[0].message 
  //   // });
  // });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;

  User.findAll()
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while retrieving Users."
    });
  });
};

// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  User.findByPk(id)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: "Error retrieving User with id=" + id
    });
  });
};

// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  // console.log(req.body);
  // if (!req.body.name) {
  //   res.status(500).send({
  //     message: "No data received."
  //   });
  //   return;
  // }
  User.update(req.body, {
    where: { userID: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "User was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating User with id=" + id
    });

  });
};

// Delete a User with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { userID: id }
  })
  .then(num => {

    if (num == 1) {
      res.send({
        message: "User was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete User with id=${id}. Maybe User was not found!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete User with id=" + id
    });
  });
};
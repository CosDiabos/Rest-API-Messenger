const db = require("../models/");
const Session = db.Session;
// const sessionCont = require("../controllers/user.controller.js");
const Op = db.Sequelize.Op;
const ULID = require('ulid')



// Create and Save a new Session
exports.createSession = (function(userObj) {

  uid = ULID.ulid();
  // Create a session
  const newSession = {
    sessionID: uid,
    userID: userObj.userID,
    authCode: makeAuthCode(6)
    
  };

//return newSession;
  // Save Session in the database
  Session.create(newSession)
    .then(data => {
      console.log("session added!");
      return true;
    })
    .catch(err => {
      console.log("session failed!");
      console.log(err);
      return false;
    });
});


// Retrieve all Sessions from the database.
exports.findAll = (req, res) => {

  Session.findAll()
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while retrieving Sessions."
    });
  });
  }

// Find a single Session with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  Session.findByPk(id)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: "Error retrieving Session with id=" + id
    });
  });
}

// Update a Session by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  // console.log(req.body);
  // if (!req.body.name) {
  //   res.status(500).send({
  //     message: "No data received."
  //   });
  //   return;
  // }
  Session.update(req.body, {
    where: { userID: id }
  })
  .then(num => { })
  .catch(err => { });
  Session.findAll({
        where: {
          userID: {
            [Op.eq]:req.body.userID
          },
          authCode: {
            [Op.eq]:req.body.authCode
          }
        }, limit: 1
      }).then(data => {
        res.send(data[0]);
      }).catch(err => {
        res.status(500).send({
          message: "Error selecting..",
          err: err
        });

      });
};


// Delete a Session with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Session.destroy({
    where: { userID: id }
  })
  .then(num => {
    console.log(num);
    if (num == 1) {
      res.send({
        message: "Session was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete Session with id=${id}. Maybe Session was not found!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete Session with id=" + id
    });
  });
}

function makeAuthCode(length) {
   var result           = '';
   var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
   var charactersLength = characters.length;
   for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}
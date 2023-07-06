const db = require("../models/");
const ConvoUser = db.ConvoUser;
const Op = db.Sequelize.Op;



// Create and Save a new ConvoUser
exports.create = (req, res) => {
  if (!req.body.userID) {
    res.status(400).send({
      message: "Missing info..."
    });
  }
  
  ConvoUser.create(req.body)
  .then( data => {
      res.send({
          message: "OK."
        });
    }).catch(err => {
      res.send({
          message: "Error creating conversation....",
          obj: err
        });
    });

  // Save ConvoUser in the database
  // ConvoUser.create(req.body)
  // .then(data => {
  //     console.log(sessionCont.createSession(req.body));
  //     console.log("ConvoUser session for new user created.");
  //     res.send({
  //       message: "OK!"
  //     });
  // })
  // .catch(err => {
  //     console.log(err);
  //     ConvoUser.findByPk(req.body.userID)
  //     .then(data => {
  //       console.log(sessionCont.createSession(req.body));
  //       console.log("ConvoUser session for current user created.");
  //     })
  //     .catch(err => {
  //       res.status(500).send({
  //         message: "Error creating session for existing user."
  //       });
  //     });
  //     console.log(err.errors);
  //   // res.status(500).send({
  //   //   message:
  //   //   "Some error occurred while creating the ConvoUser. " + err.errors[0].message 
  //   // });
  // });
};

// Retrieve all ConvoUsers from the database.
exports.findAll = (req, res) => {
  console.log("!");
  ConvoUser.findAll()
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while retrieving ConvoUsers."
    });
  });
};

// Find a single ConvoUser with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  ConvoUser.findByPk(id)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: "Error retrieving ConvoUser with id=" + id
    });
  });
};

// Update a ConvoUser by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  
  ConvoUser.update(req.body, {
    where: { conversationID: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "ConvoUser was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update ConvoUser with id=${id}. Maybe ConvoUser was not found or req.body is empty!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating ConvoUser with id=" + id
    });

  });
};

// Delete a ConvoUser with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  ConvoUser.destroy({
    where: { conversationID: id }
  })
  .then(num => {

    if (num == 1) {
      res.send({
        message: "ConvoUser was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete ConvoUser with id=${id}. Maybe ConvoUser was not found!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete ConvoUser with id=" + id
    });
  });
};
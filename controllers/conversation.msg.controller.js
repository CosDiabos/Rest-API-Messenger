const db = require("../models/");
const ConvoMsg = db.ConvoMsg;
const Op = db.Sequelize.Op;
const ULID = require('ulid')




// Create and Save a new ConvoMsg
exports.create = (req, res) => {
  
uid = ULID.ulid();
  req.body.messageID = uid;
  console.log(req.body);
  ConvoMsg.create(req.body)
  .then( data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
          message: "Error creating conversation.message....",
          obj: err
        });
    });

  // Save ConvoMsg in the database
  // ConvoMsg.create(req.body)
  // .then(data => {
  //     console.log(sessionCont.createSession(req.body));
  //     console.log("ConvoMsg session for new user created.");
  //     res.send({
  //       message: "OK!"
  //     });
  // })
  // .catch(err => {
  //     console.log(err);
  //     ConvoMsg.findByPk(req.body.userID)
  //     .then(data => {
  //       console.log(sessionCont.createSession(req.body));
  //       console.log("ConvoMsg session for current user created.");
  //     })
  //     .catch(err => {
  //       res.status(500).send({
  //         message: "Error creating session for existing user."
  //       });
  //     });
  //     console.log(err.errors);
  //   // res.status(500).send({
  //   //   message:
  //   //   "Some error occurred while creating the ConvoMsg. " + err.errors[0].message 
  //   // });
  // });
};

// Retrieve all ConvoMsgs from the database.
exports.findAll = (req, res) => {
  ConvoMsg.findAll()
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while retrieving ConvoMsgs."
    });
  });
};

// Find a single ConvoMsg with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  ConvoMsg.findByPk(id)
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message: "Error retrieving ConvoMsg with id=" + id
    });
  });
};

// Update a ConvoMsg by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  
  ConvoMsg.update(req.body, {
    where: { messageID: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "ConvoMsg was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update ConvoMsg with id=${id}. Maybe ConvoMsg was not found or req.body is empty!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating ConvoMsg with id=" + id
    });

  });
};

// Delete a ConvoMsg with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  ConvoMsg.destroy({
    where: { messageID: id }
  })
  .then(num => {

    if (num == 1) {
      res.send({
        message: "ConvoMsg was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete ConvoMsg with id=${id}. Maybe ConvoMsg was not found!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete ConvoMsg with id=" + id
    });
  });
};
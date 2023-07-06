module.exports = app => {
  const convoMsg = require("../controllers/conversation.msg.controller.js");
  
  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", convoMsg.create);

  // Retrieve all Users
  router.get("/", convoMsg.findAll);

  // Retrieve all published Users
  //router.get("/published", convoMsg.findAllPublished);

  // Retrieve a single User with id
  router.get("/:id", convoMsg.findOne);

  // Update a Tutorial with id
   router.put("/:id", convoMsg.update);

  // Delete a Tutorial with id
  router.delete("/:id", convoMsg.delete);

  // Delete all Users
  //router.delete("/", sessionCont.deleteAll);

  app.use('/api/convoMsg', router);
};
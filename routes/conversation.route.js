module.exports = app => {
  const conversation = require("../controllers/conversation.controller.js");
  
  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", conversation.create);

  // Retrieve all Users
  router.get("/", conversation.findAll);

  // Retrieve all published Users
  //router.get("/published", conversation.findAllPublished);

  // Retrieve a single User with id
  router.get("/:id/:length", conversation.findOne);

  // Update a Tutorial with id
   router.put("/:id", conversation.update);

  // Delete a Tutorial with id
  router.delete("/:id", conversation.delete);

  // Delete all Users
  //router.delete("/", sessionCont.deleteAll);

  app.use('/api/conversation', router);
};
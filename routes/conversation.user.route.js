module.exports = app => {
  const convoUser = require("../controllers/conversation.user.controller.js");
  
  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/", convoUser.create);

  // Retrieve all Users
  router.get("/", convoUser.findAll);

  // Retrieve all published Users
  //router.get("/published", convoUser.findAllPublished);

  // Retrieve a single User with id
  router.get("/:id", convoUser.findOne);

  // Update a Tutorial with id
   // router.put("/:id", convoUser.update);

  // Delete a Tutorial with id
  router.delete("/:id", convoUser.delete);

  // Delete all Users
  //router.delete("/", sessionCont.deleteAll);

  app.use('/api/convoUser', router);
};
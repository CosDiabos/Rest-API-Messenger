module.exports = app => {
  const sessionCont = require("../controllers/session.controller.js");
  
  var router = require("express").Router();

  // Create a new Tutorial
  // router.post("/", sessionCont.create);

  // Retrieve all Users
  router.get("/", sessionCont.findAll);

  // Retrieve all published Users
  //router.get("/published", sessionCont.findAllPublished);

  // Retrieve a single User with id
  router.get("/:id", sessionCont.findOne);

  // Update a Tutorial with id
  router.put("/:id", sessionCont.update);

  // Delete a Tutorial with id
  router.delete("/:id", sessionCont.delete);

  // Delete all Users
  //router.delete("/", sessionCont.deleteAll);

  app.use('/api/session', router);
};
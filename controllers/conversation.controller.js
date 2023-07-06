const db = require("../models/");
const Conversation = db.Conversation;
const ConversationMessages = db.ConvoMsg;
const ConversationUser = db.ConvoUser;
const User = db.User;
const Op = db.Sequelize.Op;
const crypto = require('crypto');
var sha1 = require('sha1');
const ULID = require('ulid')
var transportationArray = [];




// Create and Save a new Conversation
exports.create = (req, res) => {
  uid = ULID.ulid();
  req.body.conversationID = uid;

  
  //Check if user exists
  // user.findOrCreate({where: {username: 'sdepold'}, defaults: {job: 'Technical Lead JavaScript'}})
  Conversation.create(req.body)
  .then( data => {
      res.send(data);
    }).catch(err => {
      res.status(500).send({
          message: "Error creating conversation....",
          obj: err
        });
    });

  // Save Conversation in the database
  // Conversation.create(req.body)
  // .then(data => {
  //     console.log(sessionCont.createSession(req.body));
  //     console.log("Conversation session for new user created.");
  //     res.send({
  //       message: "OK!"
  //     });
  // })
  // .catch(err => {
  //     console.log(err);
  //     Conversation.findByPk(req.body.userID)
  //     .then(data => {
  //       console.log(sessionCont.createSession(req.body));
  //       console.log("Conversation session for current user created.");
  //     })
  //     .catch(err => {
  //       res.status(500).send({
  //         message: "Error creating session for existing user."
  //       });
  //     });
  //     console.log(err.errors);
  //   // res.status(500).send({
  //   //   message:
  //   //   "Some error occurred while creating the Conversation. " + err.errors[0].message 
  //   // });
  // });
};
var conversationObj = 
                      {
                        name:"",

                      }
// Retrieve all Conversations from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;

  Conversation.findAll()
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
      err.message || "Some error occurred while retrieving Conversations."
    });
  });
};

// Find a single Conversation with an id
exports.findOne = (req, res) => {

  const id = req.params.id;
  const length = req.params.length;

  var Dedata = [];
  var ObjStruct = {
              conversationID:"",
              participants:[],
              messages:[]
            };
  fetchConversations = (async () => {
    try {
      Conversation.hasMany(ConversationUser, {foreignKey:'conversationID'});
      ConversationUser.belongsTo(Conversation, {foreignKey:'conversationID'});
      await (
        Dedata = ConversationUser.findAll({
          where: { userID:id }
        ,
          include: [{
          model: Conversation,
      //  required: false
         }]} ).then(data => {
          var ffs = [];
          data.forEach(function (userC) {
            tmpStruct = Object.assign({}, ObjStruct);
            temp = userC.get({plain:true});
            // tmpStruct.conversationID = temp.conversation;
            ffs.push(temp.conversation);
          });
          return ffs;
        }).catch(err => {
          res.status(500).send({
            message: "Error retrieving Conversation with id=" + id + " error" + err
          });
        })
        );

      return Dedata;
    } catch (e) {
      console.log("OMG " + e);
    }
  });

    fetchConversations().then(result => {
      // console.log("Dedata");
      // console.log(result);

      //   this[index] = "hello world";
      // }, result);
      // result.forEach(eachConvo => {

      fetchParticipants = (async () => {
        try {

          User.hasMany(ConversationUser, {foreignKey:"userID"});
          ConversationUser.belongsTo(User, {foreignKey:"userID"});
            result.map(async (eachConvo) => {
            await (Dedata = ConversationUser.findAll({
          where: { conversationID:eachConvo.conversationID },
          include: [{
          model: User,
      //  required: false
         }]
        }).then(data => {
          var ffs = [];
          // console.log("PARTICIPANTS FOR cID: " + eachConvo.conversationID);
          data.forEach(function (userC) {
            // console.log("userC.get({plain:true})");
            // console.log(userC.get({plain:true}).user);
            ffs.push(userC.get({plain:true}).user);
          });
          eachConvo.participants = ffs;
          return result;
        })
        .catch(err => {
          res.status(500).send({
            message: "Error retrieving Conversation with id=" + id + " error" + err
          });
        })
        );
      });
      return await Dedata;
      // return Dedata;
          
        } catch (e) {
      console.log("OMG 2 " + e);
        }
      });

      // console.log("fetch part: " + );
      
      fetchParticipants().then(data => { 
        // console.log("data"); console.log(data);

        fetchMessages = (async () => {
        try {

            data.map(async (eachConvo) => {
            await (Dedata = ConversationMessages.findAll({
          where: { conversationID:eachConvo.conversationID },
          order: [['date', 'ASC']]
        }).then(data => {
          var ffs = [];
          // console.log("PARTICIPANTS FOR cID: " + eachConvo.conversationID);
          data.forEach(function (userC) {
            
            ffs.push(userC.get({plain:true}));
          });
          eachConvo.messages = ffs;
          return result;
        })
        .catch(err => {
          res.status(500).send({
            message: "Error retrieving Conversation with id=" + id + " error" + err
          });
        })
        );
      });
      return await Dedata;
      // return Dedata;
          
        } catch (e) {
      console.log("OMG 2 " + e);
        }
      });
        fetchMessages().then(data => { 
        
        var lengthNewRequest = JSON.stringify(data, undefined, 1);
        console.log(lengthNewRequest);
        console.log(length);
        // console.log(parseInt(+length-1930));
        console.log(lengthNewRequest.length);
        if (length>=lengthNewRequest.length) {
          res.status(401).send({newDataMarker:"OK"});  
        } else {
          res.send(lengthNewRequest);
        }
        // console.log("dataMessages");
        // console.log(data);
        return data; 

        });
      });
      // .then(result => {

      //  console.log("result");
      //  console.log(result);
      // return result;
      // });
    });
  };

// Update a Conversation by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  
  Conversation.update(req.body, {
    where: { conversationID: id }
  })
  .then(num => {
    if (num == 1) {
      res.send({
        message: "Conversation was updated successfully."
      });
    } else {
      res.send({
        message: `Cannot update Conversation with id=${id}. Maybe Conversation was not found or req.body is empty!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Error updating Conversation with id=" + id
    });

  });
};

// Delete a Conversation with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Conversation.destroy({
    where: { conversationID: id }
  })
  .then(num => {

    if (num == 1) {
      res.send({
        message: "Conversation was deleted successfully!"
      });
    } else {
      res.send({
        message: `Cannot delete Conversation with id=${id}. Maybe Conversation was not found!`
      });
    }
  })
  .catch(err => {
    res.status(500).send({
      message: "Could not delete Conversation with id=" + id
    });
  });
};

function grabMessages(conversationID) {
  Conversation.findByPk(conversationID)
  .then(data2 => {
    return data2;
  })
  .then(data3 => {
    var a = ConversationUser.findAll({
      where: { conversationID: data3.conversationID }})
    .then(data => {
        return data;
      });
    return a;
    }).then(data4 => {
    data4.forEach(e => {
      transportationArray.push(e.get({plain:true}));
    });
      // transportationArray.push(data4.get({plain:true}));
      return transportationArray
    }).then(omg => { return omg; })
    .catch(er => {
      console.log("error! " + er)
    });
  }


async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}






fetchConversations = (async () => {
    try {
      await (
        Dedata = ConversationUser.findAll({
          where: { userID:id }
        }).then(data => {
          var ffs = [];
          data.forEach(function (userC) {
            tmpStruct = Object.assign({}, ObjStruct);
            temp = userC.get({plain:true});
            tmpStruct.conversationID = temp.conversationID;
            ffs.push(tmpStruct);
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
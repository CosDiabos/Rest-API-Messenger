module.exports = function conversations_model(sequelize, DataTypes) {

	var Conversation = sequelize.define('conversation', {

		conversationID: {
			type: DataTypes.STRING(200), primaryKey: true

		},
		name: {
			type: DataTypes.STRING(50), defaultValue: ""

		},
		profilePicture: {
			type: DataTypes.TEXT, defaultValue: ""

		},
		lastActivity: {
			type: 'timestamp'

		}},
		{
			tableName: 'conversations',
			timestamps: false
		}
		);

  // {
  //   instanceMethods: {
  //     retrieveAll: function(onSuccess, onError) {
		// Users.findAll({
		// 	attributes: {}
		// })
		// 	.then(onSuccess).catch(onError);	
	 //  },
  //     retrieveById: function(user_id, onSuccess, onError) {
		// Users.find({where: {id: user_id}}, {raw: true})
		// 	.then(onSuccess).catch(onError);	
	 //  },
  //     add: function(onSuccess, onError) {
		// var id = this.userID;
		// var email = this.name;
		// var pw = this.status;
		
		// Users.build({ id:id, email: email, pw: pw })
		// 	.save().then(onSuccess).catch(onError);
	 //   },
	 //  updateById: function(user_id, onSuccess, onError) {
		// var id = user_id;
		// var email = this.name;
		// var pw = this.status;

		// Users.update({ email:email, pw:pw },{where: {id: id} })
		// 	.then(onSuccess).catch(onError);
	 //   },
  //     removeById: function(user_id, onSuccess, onError) {
		// Users.destroy({where: {id: user_id}}).then(onSuccess).catch(onError);	
	 //  }
  //   }
  // }); 
  return Conversation;
}
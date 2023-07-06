module.exports = function users_model(sequelize, DataTypes) {

	var User = sequelize.define('user', {

		userID: {
			type: DataTypes.STRING(200), primaryKey: true

		},
		countryID: {
			type: DataTypes.INTEGER(4)

		},
		phoneNumber: {
			type: DataTypes.STRING(60)

		},
		name: {
			type: DataTypes.STRING(40),
			defaultValue: ""

		},
		username: {
			type: DataTypes.STRING(10),
			defaultValue: ""

		},
		profilePicture: {
			type: DataTypes.TEXT,
			defaultValue: ""

		},
		status: {
			type: DataTypes.STRING(120),
			defaultValue: ""

		},
		publicKey: {
			type: DataTypes.STRING(3300),
			defaultValue: ""

		}},
		{
			tableName: 'Users',
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
  return User;
}
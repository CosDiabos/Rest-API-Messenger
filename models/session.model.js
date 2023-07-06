module.exports = function sessions_model(sequelize, DataTypes) {

	var Session = sequelize.define('session', {

		sessionID: {
			type: DataTypes.STRING(200), primaryKey: true

		},
		userID: {
			type: DataTypes.STRING(200)

		},
		authCode: {
			type: DataTypes.STRING(8)

		},
		lastAccess: {
			type: 'timestamp'

		},
		active: {
			type: DataTypes.INTEGER(1),
			defaultValue: 0

		}
	},
		{
			tableName: 'sessions',
			timestamps: false
		}
		);

  return Session;
}
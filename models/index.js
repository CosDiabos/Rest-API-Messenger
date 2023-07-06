const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  port: dbConfig.PORT,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  logging: console.log,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require("./user.model.js")(sequelize, Sequelize);
db.Session = require("./session.model.js")(sequelize, Sequelize);
db.Conversation = require("./conversation.model.js")(sequelize, Sequelize);
db.ConvoUser = require("./conversation.user.model.js")(sequelize, Sequelize);
db.ConvoMsg = require("./conversation.msg.model.js")(sequelize, Sequelize);

module.exports = db;
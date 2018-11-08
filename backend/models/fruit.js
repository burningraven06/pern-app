var Sequelize = require('sequelize');
var connInfo = require('../dbconn_old/dbKeys');

var connectionStr = 'postgres://postgres:postgres@localhost:5432/carfruitdb';
var connectionStrLive = connInfo;
var fruitSequelize = new Sequelize(connectionStr);

var Fruit = fruitSequelize.define('fruits', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  weight: {
    type: Sequelize.STRING,
    allowNull: false
  },
  fsize: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
})

fruitSequelize.sync().then(() => console.log('Db Connection OK, Fruit Table Ready')).catch(err => console.log("DB Err: ", err));

module.exports = Fruit
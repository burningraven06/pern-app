var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');

var connectionStr = 'postgres://postgres:postgres@localhost:5432/carfruitdb';
var connectionStrLive = "postgres://areiswihugxmga:ed6d5bda5b8616376d60b66cb4ee037765f92a9593882b81d4d56d8539d7c4d1@ec2-174-129-225-9.compute-1.amazonaws.com:5432/d9hou6nr599di";
var fruitSequelize = new Sequelize(connectionStrLive);

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
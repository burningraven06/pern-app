var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');

var connectionStr = 'postgres://postgres:postgres@localhost:5432/carfruitdb';
var connectionStrLive = "postgres://areiswihugxmga:ed6d5bda5b8616376d60b66cb4ee037765f92a9593882b81d4d56d8539d7c4d1@ec2-174-129-225-9.compute-1.amazonaws.com:5432/d9hou6nr599di";
var carSequelize = new Sequelize(connectionStrLive);

var Car = carSequelize.define('cars', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  color: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false
  }
});

carSequelize.sync().then(() => console.log('Db Connection OK, Car Table Ready')).catch(err => console.log("DB Err: ", err));

module.exports = Car;
var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');

var connectionStr = 'postgres://postgres:postgres@localhost:5432/carfruitdb';
var carSequelize = new Sequelize(connectionStr);

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
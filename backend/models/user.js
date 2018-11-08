var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');
var connInfo = require('..dbconn_old/dbKeys');


var connectionStr = 'postgres://postgres:postgres@localhost:5432/carfruitdb';
var connectionStrLive = connInfo;
var userSequelize = new Sequelize(connectionStr);

var User = userSequelize.define('users', {
  username: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
}, {
  hooks: {
    beforeCreate: (user) => {
      const salt = bcrypt.genSaltSync();
      user.password = bcrypt.hashSync(user.password, salt);
    }
  }
});

User.prototype.validPassword = function (password) {
  return bcrypt.compareSync(password, this.password);
}

userSequelize.sync().then( () => console.log('Db Connection OK, User Table Ready')).catch( err => console.log("DB Err: ", err));

module.exports = User;
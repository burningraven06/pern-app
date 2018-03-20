var Sequelize = require('sequelize');
var bcrypt = require('bcrypt');

var connectionStr = 'postgres://postgres:postgres@localhost:5432/carfruitdb';
var connectionStrLive = "postgres://areiswihugxmga:ed6d5bda5b8616376d60b66cb4ee037765f92a9593882b81d4d56d8539d7c4d1@ec2-174-129-225-9.compute-1.amazonaws.com:5432/d9hou6nr599di";
var userSequelize = new Sequelize(connectionStrLive);

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
var express = require('express');
const User = require('../models/user');
var userRouter = express.Router();

userRouter.post('/new', (req, res) => {
  User.create({
    username: req.body.username, email: req.body.email, password: req.body.password
  }).then(user => {
    req.session.user = user.dataValues;
    res.status(200).send({ inSession: true, loggedUser: user })
  }).catch(err => res.status(401).send({ inSession: false, errMsg: err }))
})

userRouter.post('/login', (req, res) => {
  var username = req.body.username;
  var password = req.body.password;
  User.findOne({ where: { username: username } }).then(user => {
    if (!user) {
      res.status(200).send({ incorrectUsername: true, inSession: false, msg: "Incorrect Username" })
    } else if (!user.validPassword(password)) {
      res.status(200).send({ incorrectPassword: true, inSession: false, msg: "Incorrect Password" })
    } else {
      res.status(200).send({
        inSession: true, msg: "Logged in!", loggedUserName: user.username
      })
    }
  })
})

userRouter.get('/logout', (req, res) => {
  res.clearCookie('user_sid');
  res.status(200).send({ inSession: false });
})

userRouter.get('/alluserdata', (req, res, next) => {
  User.findAll({attributes: ['email', 'username']}).then( data => {
    res.status(200).json({ allUserData: data }) 
  }).catch(err => next(err));
})

module.exports = userRouter;
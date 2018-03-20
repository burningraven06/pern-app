const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser') ;
const session = require('express-session');
const morgan = require('morgan');
const User = require('./backend/models/user');

const carRouter = require('./backend/routes/carRoutes');
const fruitRouter = require('./backend/routes/fruitRoutes');
const userRouter = require('./backend/routes/userRoutes');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json());

app.use(session({
  key: 'user_sid',
  secret: 'something',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 600000
  }
}));

app.use(express.static('./react_node_express_app/build/' || './react_node_express_app/public/'));

app.listen(port, () =>{
   console.log(`Express running on port: ${port}`);
});

app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user){
    res.clearCookie('user_sid');
  }
  next();
})

sessionChecker = (req, res, next) => {
  if (req.session.user && req.cookies.user_sid){
    res.status(200).send({ inSession: true});
  } else {
    next();
  }
}

app.get('/api', sessionChecker, (req, res) => {
  res.status(200).send({ inSession: false });
});

app.get('/api/hello', (req, res) => {
  res.status(200).send({ backMsg: 'Express App Works' });
});

app.use('/api/user', userRouter);
app.use('/api/cars', carRouter);
app.use('/api/fruits', fruitRouter);
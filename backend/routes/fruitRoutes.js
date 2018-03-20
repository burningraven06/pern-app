var express = require('express');
const Fruit = require('../models/fruit');

var fruitRouter = express.Router();

fruitRouter.get('/', (req, res, next) => {
  Fruit.findAll().then((data) => {
    res.status(200).send({ backFruits: data, msg: "Fruits retrieved" })
  }).catch(err => next(err))
});

fruitRouter.post('/', (req, res, next) => {
  Fruit.create({
    name: req.body.name, weight: req.body.weight, fsize: parseInt(req.body.fsize)
  }).then(fruit => {
    res.status(200).send({ msg: "Fruit Created" })
  }).catch(err => next(err)) 
});

fruitRouter.get('/:id', (req, res, next) => {
  Fruit.findOne({
    where: {
      id: parseInt(req.params.id)
    }
  }).then(fruit => {
    fruit ? res.status(200).send({ singleFruit: fruit }) : res.status(200).send({ errMsg: "Fruit Doesn't Exist" })
  }).catch(err => next(err))
});

fruitRouter.patch('/:id', (req, res, next) => {
  Fruit.update({
    name: req.body.name, weight: req.body.weight, fsize: parseInt(req.body.fsize)
  },
  {
    where: {
      id: parseInt(req.params.id)
    }
  }).then((fruit) => {
    fruit ? res.status(200).send({ msg: "Fruit Updated" }) : res.status(200).send({ errMsg: "Fruit Doesn't Exist", badID: true })
  }).catch(err => next(err))
});

fruitRouter.delete('/:id', (req, res, next) => {
  Fruit.destroy({
    where: {
      id: parseInt(req.params.id)
    }
  }).then(result => {
    result ? res.status(200).send({ msg: "Fruit Deleted" }) : res.status(200).send({ errMsg: "Fruit Doesn't Exist", badID: true })
  }).catch(err => next(err))
});

module.exports = fruitRouter;


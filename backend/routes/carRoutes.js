var express = require ('express');
const Car = require('../models/car');

var carRouter = express.Router();

carRouter.get('/', (req, res, next) => {
  Car.findAll().then( (data) => {
    res.status(200).send({ backCars: data, msg: "Cars retrieved" })
  }).catch( err => next(err))
  
});

carRouter.post('/', (req, res, next) => {
  Car.create({
    name: req.body.name, color: req.body.color, price: parseInt(req.body.price)
  }).then( car => {
    res.status(200).send({ msg: "Car Created"})
  }).catch(err => next(err))
});

carRouter.get('/:id', (req, res, next) =>{
  Car.findOne({
    where: {
      id: parseInt(req.params.id)
    }
  }).then(car => {
    car? res.status(200).send({ singleCar: car}) : res.status(200).send({ errMsg: "Car Doesn't Exist"})
  }).catch(err => next(err));
});

carRouter.patch('/:id', (req, res, next) => {
  Car.update({
    name: req.body.name, color: req.body.color, price: parseInt(req.body.price)
    },
    {
    where: {
      id: parseInt(req.params.id)
    }
  }).then( (car) => {
    car ? res.status(200).send({ msg: "Car Updated" }) : res.status(200).send({ errMsg: "Car Doesn't Exist", badID: true}) }).catch(err => next(err))
});

carRouter.delete('/:id', (req, res, next) => {
  Car.destroy({
    where: {
      id: parseInt(req.params.id)
    }
  }).then( result => {
    result ? res.status(200).send({ msg: "Car Deleted" }) : res.status(200).send({ errMsg: "Car Doesn't Exist", badID: true})
  }).catch( err => next(err))
});

module.exports = carRouter;
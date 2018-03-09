var express = require ('express');
// const sampleCarArray = require('../data/cars');

var carRouter = express.Router();
var carDBQueries = require('../dbqueries/carqueries');

carRouter.get('/', carDBQueries.getAllCars);

carRouter.post('/', carDBQueries.createCar);

carRouter.get('/:id',carDBQueries.getSingleCar);

carRouter.patch('/:id', carDBQueries.updateCar);

carRouter.delete('/:id', carDBQueries.deleteCar);

module.exports = carRouter;
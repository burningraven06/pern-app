var express = require ('express');
var app = express();

const sampleCarArray = require('../data/cars');
var carRouter = express.Router();

carRouter.get('/', (req, res) => {
   res.status(200).send({ backCars: sampleCarArray });
})

module.exports = carRouter;
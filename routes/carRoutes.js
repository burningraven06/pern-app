var express = require ('express');

const sampleCarArray = require('../data/cars');
var carRouter = express.Router();

carRouter.get('/', (req, res) => {
   res.status(200).send({ backCars: sampleCarArray });
})

carRouter.post('/', (req, res) => {

});

carRouter.get('/:id', (req, res) =>{

});

carRouter.patch('/:id', (req, res) =>{

});

carRouter.delete('/:id', (req, res) => {

});

module.exports = carRouter;
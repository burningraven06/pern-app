var express = require('express');
const sampleFruitArray = require('../data/fruits');

var fruitRouter = express.Router();

fruitRouter.get('/', (req, res) => {
   res.status(200).send({ backFruits: sampleFruitArray });
});

fruitRouter.post('/', (req, res) => {

});

fruitRouter.get('/:id', (req, res) => {

});

fruitRouter.patch('/:id', (req, res) => {

});

fruitRouter.delete('/:id', (req, res) => {

});

module.exports = fruitRouter;


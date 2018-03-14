var express = require('express');
// const sampleFruitArray = require('../data/fruits');
var fruitDBQueries = require('../dbqueries/fruitqueries');
var fruitRouter = express.Router();

fruitRouter.get('/', fruitDBQueries.getAllFruits);

fruitRouter.post('/', fruitDBQueries.createFruit );

fruitRouter.get('/:id', fruitDBQueries.getSingleFruit);

fruitRouter.patch('/:id', fruitDBQueries.updateFruit);
 
fruitRouter.delete('/:id', fruitDBQueries.deleteFriut);

module.exports = fruitRouter;


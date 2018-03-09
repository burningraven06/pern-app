var express = require('express');
// const sampleFruitArray = require('../data/fruits');
var fruitQueries = require('../dbqueries/fruitqueries');
var fruitRouter = express.Router();

fruitRouter.get('/', fruitQueries.getAllFruits);

fruitRouter.post('/', (req, res) => {

});

fruitRouter.get('/:id', (req, res) => {

});

fruitRouter.patch('/:id', (req, res) => {

});

fruitRouter.delete('/:id', (req, res) => {

});

module.exports = fruitRouter;


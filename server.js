const express = require('express');
const app = express();
const port = process.env.PORT || 3300;
const sampleCarArray = require('./data/cars');
const sampleFruitArray = require('./data/fruits');

app.listen(port, () =>{
   console.log(`Express running on port: ${port}`);
});

app.get('/api/hello', (req, res) => {
   res.status(200).send({ backMsg: 'Express App Works' });
});

app.get('/api/cars', (req, res) => {
   res.status(200).send({ backCars: sampleCarArray });
});

app.get('/api/fruits', (req, res) => {
   res.status(200).send({backFruits: sampleFruitArray });
})
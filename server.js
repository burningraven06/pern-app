const express = require('express');
const app = express();
const port = process.env.PORT || 3500;
const sampleFruitArray = require('./data/fruits');
const carRouter = require('./routes/carRoutes');


app.listen(port, () =>{
   console.log(`Express running on port: ${port}`);
});

app.get('/api/hello', (req, res) => {
   res.status(200).send({ backMsg: 'Express App Works' });
});

app.use('/api/cars', carRouter);

app.get('/api/fruits', (req, res) => {
   res.status(200).send({backFruits: sampleFruitArray });
})
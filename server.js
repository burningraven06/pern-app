const express = require('express');
const app = express();
const port = process.env.PORT || 3500;
const carRouter = require('./routes/carRoutes');
const fruitRouter = require('./routes/fruitRoutes');


app.listen(port, () =>{
   console.log(`Express running on port: ${port}`);
});

app.get('/api/hello', (req, res) => {
   res.status(200).send({ backMsg: 'Express App Works' });
});

app.use('/api/cars', carRouter);
app.use('/api/fruits', fruitRouter);
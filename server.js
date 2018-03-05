const express = require('express');
const app = express();
const port = process.env.PORT || 3300;

app.get('/api/hello', (req, res) => {
   res.status(200).send({title: 'App Works'});
});

app.listen(port, () =>{
   console.log(`Express running on port: ${port}`);
})
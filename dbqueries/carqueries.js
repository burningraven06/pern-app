var express = require('express');
var db = require('../db/connection');

getAllCars = (req, res, next) =>{
   db.any('select * from cars').then( (data) => {
      res.status(200).send({ backCars: data}).catch( (err) => { return next(err) })
   })
}

module.exports = {
   getAllCars: getAllCars,
   // getSingleCar: getSingleCar,
   // createCar: createCar,
   // updateCar: updateCar,
   // deleteCar: deleteCar
}
var express = require('express');
var db = require('../db/connection');

getAllCars = (req, res, next) =>{
   db.any('select * from cars').then( (data) => {
      res.status(200).send({ backCars: data})
   }).catch((err) => { return next(err) })
}

getSingleCar = (req, res, next) =>{
   var carID = req.params.id;
   db.one('select * from cars where id= $1', carID).then( (data) => {
      res.status(200).send({ singleCar: data})
   }).catch( (err) => { return next(err) })
}

module.exports = {
   getAllCars: getAllCars,
   getSingleCar: getSingleCar,
   // createCar: createCar,
   // updateCar: updateCar,
   // deleteCar: deleteCar
}



// db.one = single row
// db.many = one or more rows
// db.none = no rows
// db.result = 
// db.any = any from the above
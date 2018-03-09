var express = require('express');
var db = require('../dbconn/connection');

getAllCars = (req, res, next) =>{
   db.any('select * from cars').then( (data) => {
      res.status(200).send({ backCars: data})
   }).catch((err) => { next(err) })
}

getSingleCar = (req, res, next) =>{
   var carID = req.params.id;
   db.one('select * from cars where id= $1', carID).then( (data) => {
      res.status(200).send({ singleCar: data})
   }).catch( (err) => { next(err) })
}

createCar = (req, res, next) => {
   const {name, color, price} = req.body;
   db.none('insert into cars (name, color, price)' + ' values (${name}, ${color}, ${price})', {name, color, price}).then( () => {
      res.status(200).json({ message: "Car Created in DB"})
   }).catch( (err) => { next(err) })
}

updateCar = (req, res, next) => {
   db.none('update cars set name=$1, color=$2, price=$3 where id=$4', [req.body.name, req.body.color, req.body.price, parseInt(req.params.id)]).then( () => {
      res.status(200).json({ message: "Car Updated in DB"})
   }).catch( (err) => { next(err) })
}

deleteCar = (req, res, next) =>{
   db.result('delete from cars where id=$1', parseInt(req.params.id)).then( (result) => {
      res.status(200).json({ message: `${result.rowCount} Car deleted from DB`})
   }).catch( (err) => { next(err)})
}


module.exports = {
   getAllCars: getAllCars,
   getSingleCar: getSingleCar,
   createCar: createCar,
   updateCar: updateCar,
   deleteCar: deleteCar
}



// db.one = single row
// db.many = one or more rows
// db.none = no rows
// db.result = 
// db.any = any from the above
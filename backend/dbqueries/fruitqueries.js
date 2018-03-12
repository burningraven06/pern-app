var express = require('express');
var db = require('../dbconn/connection');

getAllFruits = (req, res, next) => {
   db.any("select * from fruits").then((data) => {
      res.status(200).send({ backFruits: data, message: 'Fruits Retrieved from DB'})
   }).catch( (err) => {next (err)});
}

getSingleFruit = (req, res, next)=> {
   db.one("select * from fruits where id= $1", parseInt(req.params.id)).then((data) => {
      res.status(200).send({ singleFruit: data, message: 'Fruit Retrieved from DB   ' })
   }).catch( (err) => { next (err)})
}

createFruit = (req, res, next) => {
   const {name, weight, fsize} = req.body;
   db.none('insert into fruits (name, weight, fsize)' + 'values (${name}, ${weight}, ${fsize})', {name, weight, fsize}).then( () => {
      res.status(200).json({ message: "Fruit Created in DB"})
   }).catch( err => next(err))
}

module.exports = {
   getAllFruits: getAllFruits,
   getSingleFruit: getSingleFruit,
   createFruit: createFruit
}
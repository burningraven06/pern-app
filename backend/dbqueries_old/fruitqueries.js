var express = require('express');
var db = require('../dbconn_old/connection');

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
   }).catch( (err) => { next(err) })
}

updateFruit = (req, res, next) => {
  db.none('update fruits set name=$1, weight=$2, fsize=$3 where id=$4', [req.body.name, req.body.weight, req.body.fsize, parseInt(req.params.id)]).then( () => {
    res.status(200).json({ message: "Fruit updated in DB"})
  }).catch( (err) => { next (err) })
}

deleteFriut = (req, res, next) => {
  db.result('delete from fruits where id=$1', parseInt(req.params.id)).then( (result) => {
    res.status(200).json({ message: `${result.rowCount} Fruit deleted from DB`})
  }).catch( (err) => { next(err) })
}

module.exports = {
   getAllFruits: getAllFruits,
   getSingleFruit: getSingleFruit,
   createFruit: createFruit,
   updateFruit: updateFruit,
   deleteFriut: deleteFriut
}
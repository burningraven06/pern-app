var express = require('express');
var db = require('../dbconn/connection');

getAllFruits = (req, res, next) => {
   db.any("select * from fruits").then((data) => {
      res.status(200).send({ backFruits: data})
   }).catch( (err) => {next (err)});
}

getSingleFruit = (req, res, next)=> {
   db.one("select * from fruits where id= $1", parseInt(req.params.id)).then((data) => {
      res.status(200).send({ singleFruit: data })
   }).catch( (err) => { next (err)})
}

module.exports = {
   getAllFruits: getAllFruits,
   getSingleFruit: getSingleFruit,
}
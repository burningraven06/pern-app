var express = require('express');
var db = require('../dbconn/connection');

getAllFruits = (req, res, next) => {
   db.any("select * from fruits").then((data) => {
      res.status(200).send({ backFruits: data})
   }).catch( (err) => {next (err)});
}

module.exports = {
   getAllFruits: getAllFruits
}
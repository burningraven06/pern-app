var promise = require('bluebird');
var pgpool = require('pg-promise')({
   promiseLib: promise
});

var connectionStr = "postgres://postgres:postgres@localhost:5432/carfruitdb";

var db = pgpool(connectionStr);

module.exports = db;
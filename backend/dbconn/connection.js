var blueBirdPromise = require('bluebird');
var pgpool = require('pg-promise')({
   promiseLib: blueBirdPromise
});

// var connectionStr = "postgres://postgres:postgres@localhost:5432/carfruitdb";
var connectionStr = "postgres://areiswihugxmga:ed6d5bda5b8616376d60b66cb4ee037765f92a9593882b81d4d56d8539d7c4d1@ec2-174-129-225-9.compute-1.amazonaws.com:5432/d9hou6nr599di";

var db = pgpool(connectionStr);

db.connect().then( obj => { obj.done(); console.log("DB Connection Established") }).catch( err =>  console.log("DB Connection Error:", err.message || err) );

module.exports = db;
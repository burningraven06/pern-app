var blueBirdPromise = require('bluebird');
var pgpool = require('pg-promise')({
   promiseLib: blueBirdPromise
});

// var connectionStr = "postgres://postgres:postgres@localhost:5432/carfruitdb";
var connectionStr = "postgres://ccvoombfeqheyi:74af532634ed52900af793bd6c6f3537d63b1289d86f92a8ee50ad11acc10cbb@ec2-54-163-246-193.compute-1.amazonaws.com:5432/d7egfmaeq2bj48";

var db = pgpool(connectionStr);

db.connect().then( obj => { obj.done(); console.log("DB Connection Established") }).catch( err =>  console.log("DB Connection Error:", err.message || err) );

module.exports = db;
var connInfo = require('./dbKeys');
var blueBirdPromise = require('bluebird');
var pgpool = require('pg-promise')({
   promiseLib: blueBirdPromise
});

var connectionStr = "postgres://postgres:postgres@localhost:5432/carfruitdb";
var connectionStrLive = connInfo;

var db = pgpool(connectionStr);

db.connect().then( obj => { obj.done(); console.log("DB Connection Established") }).catch( err =>  console.log("DB Connection Error:", err.message || err) );

module.exports = db;
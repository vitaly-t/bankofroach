var promise = require('bluebird');
var options = {
  // Initialization Options
  promiseLib: promise
};
var pgp = require('pg-promise')(options);
var connectionString = 'postgresql://root@localhost:26257/bank?sslmode=disable';
var db = pgp(connectionString);

module.exports = db;

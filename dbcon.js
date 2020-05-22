var mysql = require('mysql');
var pool = mysql.createPool({
  connectionLimit : 10,
  host            : 'classmysql.engr.oregonstate.edu',
  user            : 'cs340_hollowab',
  password        : '6480',
  database        : 'cs340_hollowab'
});
module.exports.pool = pool;


var mysql=require('mysql')
var MY_SQL = require('./config')
  var pool = mysql.createPool({
  connectionLimit: 0,
  host: MY_SQL.IP_MYSQL_DATABASE,
  user: "admin",
  password: "cmpe273db",
  database: "cmpe273db",
  port:'3306',
  insecureAuth : true,
  connectTimeout  : 60 * 60 * 1000,
    aquireTimeout   : 60 * 60 * 2000,
    timeout         : 60 * 60 * 1000,
})

module.exports = pool;

// var con = mysql.createConnection({
//   host: "cmpe273db.cqumuz1tfjsq.us-east-1.rds.amazonaws.com",
//   user: "admin",
//   password: "cmpe273db",
//   database: "cmpe273db",
//   port:'3306',
//   insecureAuth : true
// });

// module.exports = con;

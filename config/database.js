var mysql = require("mysql");

var  connection  = mysql.createConnection({
    // port : process.env.APP_PORT,
    // host : process.env.DB_HOST,
    // user  : process.env.DB_USER,
    // password : process.env.DB_PASS,
    // database : process.env.MYSQL_DB,
    // connectionLimit: 10

    host : "localhost",
    user : "root",
    password : "12345",
    database : "test"
});

module.exports = connection;
const express = require("express");
require("dotenv").config();
const app = express();
const port = 4000;
const userRouter = require("./api/users/user.router");
const connection = require("./config/database");

// var mysql = require("mysql");

// var connection  = mysql.createConnection({
//     // port : process.env.DB_PORT,
//     // host : process.env.DB_HOST,
//     // user  : process.env.DB_USER,
//     // password : process.env.DB_PASS,
//     // database : process.env.MYSQL_DB,
//     // connectionLimit: 10

//     host : "localhost",
//     user : "root",
//     password : "12345",
//     database : "test"

  
// });


app.use(express.json());
app.use("/api/user", userRouter);

// app.listen( process.env.APP_PORT, () => {
app.listen( port, () => {
    console.log(`Server is running on http://localhost:${port}`)
    // console.log(`Server is running on http://localhost:${process.env.APP_PORT}`)
    connection.connect((err)=>{
        if(err){
            console.log("Error Connected to DB");
            return;
        }
        console.log("Database Connected!");
    });

    // connection.end((err) => {
       
    //   });
})
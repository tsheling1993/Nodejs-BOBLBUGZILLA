const mysql = require('mysql');
var connection = mysql.createConnection({
  port:3306,
  host: "localhost",
  user: "root",
  password: "root",
  database: "boblzilla"
})

connection.connect((err)=>{
  if(!err){
    console.log("Database connection success");
    console.log("Testing for the second commit");	
  }
   else
   console.log(err);
});

module.exports = connection;
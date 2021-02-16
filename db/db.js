const mysql = require("mysql");


const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "pasanmadushan",
    database: "electrica"
  });

  
module.exports = db;
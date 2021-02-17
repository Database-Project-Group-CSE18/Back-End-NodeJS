const mysql = require("mysql");

const database = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

// database.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected!");
// })
// ;

// database.connect((err) => {
//   if (err) {
//     return console.log(`Something went wrong while connecting to the database
//     Error : ${err}
//     `);
//   }

//   console.log("Connected to the MySQL server");
// });


module.exports = database;

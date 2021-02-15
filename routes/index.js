var express = require("express");
var router = express.Router();
const mysql = require("mysql");

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "0719773008",
  database: "electrica"
});

/* GET home page. */
router.get("/", function (req, res, next) {
  // const sqlInsert =
  //   "INSERT INTO reply (Reply_ID, Feedback_ID, Reply) VALUES ('2', '5', 'Database is connected');";
  // db.query(sqlInsert, (err, result) => {
  //   if(err) {
  //     res.send(err);
  //   } else {
  //     res.send('Success');
  //   }
  // });
  res.send('hi');
});

module.exports = router;

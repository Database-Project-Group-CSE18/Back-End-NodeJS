var express = require("express");
var router = express.Router();
const db = require("../config/database");


/* GET home page. */
router.get("/", function (req, res) {
  // const sqlInsert = "INSERT INTO cart (NumOfItems) VALUES ('15');";
  // db.query(sqlInsert, (err, result) => {
  //   if (err) {
  //     res.send(err);
  //   } else {
  //     res.send("Success");
  //   }
  // });
  // res.send('his' );
});

module.exports = router;

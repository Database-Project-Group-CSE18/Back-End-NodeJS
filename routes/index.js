var express = require("express");
var router = express.Router();
const db = require("../config/database");




/* GET home page. */
router.get("/", function (req, res, next) {
  const sqlInsert =
    "INSERT INTO cart (NumOfItems) VALUES ('10');";
    db.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
    });
  db.query(sqlInsert, (err, result) => {
    if(err) {
      res.send(err);
    } else {
      res.send('Success');
    }
  });
  // res.send('hi');
});

module.exports = router;

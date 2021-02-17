var express = require('express');
const bodyParser = require('body-parser');
const customerController = require('../controllers/customerController');

var router = express.Router();

router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;




var express = require('express');
const bodyParser = require('body-parser');
const customerController = require('../controllers/customerController');

var router = express.Router();

router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

router.get('/addresses',customerController.getAddresses)

module.exports = router;




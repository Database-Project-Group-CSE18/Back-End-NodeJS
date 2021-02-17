var express = require('express');
const bodyParser = require('body-parser');
const customerController = require('../controllers/customerController');

var router = express.Router();

router.use(bodyParser.json());

/* GET users listing. */
router.get('/', function(req, res) {
  res.send('respond with a resource');
});

//address routes
router.get('/addresses',customerController.getAddressesAction)
router.post('/addresses',customerController.insertAddressAction)
router.delete('/addresses',customerController.deleteAddressAction)

//bank card routes
router.get('/bankCards',customerController.getBankCardsAction)
router.post('/bankCards',customerController.insertBankCardsAction)
router.delete('/bankCards',customerController.deleteBankCardAction)


module.exports = router;




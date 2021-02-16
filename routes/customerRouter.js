const express = require('express');
const bodyParser = require('body-parser');
const customerController = require('../controllers/customerController');

const customerRouter = express.Router();

customerRouter.use(bodyParser.json());

/* GET users listing. */
customerRouter.get('/', );

module.exports = customerRouter;

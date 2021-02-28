const express = require('express');
const orderRouter = express.Router();
const orderController = require('../controllers/ItemController');
// const { deleteBankCard } = require('../model/customerModel');
const { deleteBankCard } = require('../models/userModel');

/* GET items listing. */
orderRouter.route('/').get();


module.exports = orderRouter;



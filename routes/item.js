const express = require('express');
const itemRouter = express.Router();
const itemController = require('../controllers/ItemController');

/* GET items listing. */
itemRouter.route('/').get(itemController.getAllItems);

module.exports = itemRouter;

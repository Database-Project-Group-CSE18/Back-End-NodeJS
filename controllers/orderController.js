const ItemModel = require("../models/OrderModel");
const db = require("../config/database");

const getAllOrdersAction = (req, res) => {
  OrderModel.getAllOrders()
    .then((orders) => {
      res.statusCode = 200;
      res.set("Content-Type", "application/json");
      res.json({ success: true, orders: orders });
    })
    .catch((err) => {
      res.statusCode = 500;
      res.set("Content-Type", "application/json");
      res.json({ success: false, message: err });
    });
};
exports.getAllOrdersAction = getAllOrdersAction;
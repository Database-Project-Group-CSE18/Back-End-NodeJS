const OrderModel = require("../models/OrderModel");

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


const searchOrdersInOrderlist = (req, res) => {
  OrderModel.searchOrders(req.body.item_name)
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
const getAwaitingShipmentsAction = (req, res) => {
  OrderModel.getAwaitingShipments()
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
const getAwaitingDeliveriesAction = (req, res) => {
  OrderModel.getAwaitingDeliveries()
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
const getReceivedAction = (req, res) => {
  OrderModel.getReceived()
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
const getCancellationsAction = (req, res) => {
  OrderModel.getCancellations()
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
const getReturnsAction = (req, res) => {
  OrderModel.getReturns()
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
module.exports = {
  getAllOrdersAction,
  searchOrdersInOrderlist,
  getAwaitingShipmentsAction,
  getAwaitingDeliveriesAction,
  getReceivedAction,
  getReturnsAction,
  getCancellationsAction
}
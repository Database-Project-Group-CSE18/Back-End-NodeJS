const OrderModel = require("../models/OrderModel");

const getAllOrdersAction = (req, res) => {
  OrderModel.getAllSellerOrders()
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

const Feedback = require('../models/orderModel');

var loggedUser = 1;


//should get feedback from request
const insertFeedbackAction = (req,res)=>{
    //console.log(req.body)
    Feedback.addFeedback(req.body,loggedUser)
    .then((success)=>{
        res.statusCode = 200;
        res.set("Content-Type", "application/json");
        res.json({ success: true, insertId:success.insertId});
    })
    .catch((err) => {
        res.statusCode = 500;
        res.set("Content-Type", "application/json");
        res.json({ success: false, message: err });
      });      
}


const placeOrderAction = (req,res)=>{
    console.log(req.body)
    Feedback.placeOrder()
    .then((success)=>{
        res.statusCode = 200;
        res.set("Content-Type", "application/json");
        res.json({ success: true, insertId:success.insertId});
    })
    .catch((err) => {
        res.statusCode = 500;
        res.set("Content-Type", "application/json");
        res.json({ success: false, message: err });
      });      
}

module.exports = {
  getAllOrdersAction,
  searchOrdersInOrderlist,
  getAwaitingShipmentsAction,
  getAwaitingDeliveriesAction,
  getReceivedAction,
  getReturnsAction,
  getCancellationsAction,
  insertFeedbackAction,
  placeOrderAction
}

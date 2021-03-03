const OrderModel = require("../models/OrderModel");

let date_ob = new Date();
// current date
// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);
// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
// current year
let year = date_ob.getFullYear();

let dateTime = year + "-" + month + "-" + date + " ";

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
  OrderModel.searchOrders(req.body.order_id)
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
      console.log(err);
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


//should get feedback from request
const insertFeedbackAction = (req,res)=>{
    console.log(req.body)
    Feedback.addFeedback(req.body,req.session.user.user_id)
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



const placeOrderAction = (req, res) => {
  console.log(req.body);
  Feedback.placeOrder(req.body, req.session.user.user_id, dateTime)
    .then((success) => {
      res.statusCode = 200;
      res.set("Content-Type", "application/json");
      res.json({ success: true, response: success });
    })
    .catch((err) => {
      console.log(err);
      res.statusCode = 500;
      res.set("Content-Type", "application/json");
      res.json({ success: false, message: err });
    });
};

const getOrderDetailsAction = (req, res) => {
  Feedback.getOrderDetails(req.params.order_id)
    .then((order) => {
      Feedback.getOrderItemsDetails(req.params.order_id)
        .then((orderitems) => {           
          order[0].orderitems = orderitems;
          console.log(order)
          res.statusCode = 200;
          res.set("Content-Type", "application/json");
          res.json({ success: true, order: order });
        })
        .catch((err) => {
          console.log(err);
          res.statusCode = 500;
          res.set("Content-Type", "application/json");
          res.json({ success: false, message: err });
        });
    })
    .catch((err) => {
      console.log(err);
      res.statusCode = 500;
      res.set("Content-Type", "application/json");
      res.json({ success: false, message: err });
    });
};

const MarkAsShipped = (req, res) => {
  console.log(req.body.order_id)
  OrderModel.markasShipped(req.body.order_id,dateTime)
    .then((orders) => {
      res.statusCode = 200;
      res.set("Content-Type", "application/json");
      res.json({ success: true, orders: orders });
    })
    .catch((err) => {
      res.statusCode = 500;
      res.set("Content-Type", "application/json");
      res.json({ success: false, message: err });
      console.log(err)
    });
};

module.exports = {
  getAllOrdersAction,
  getOrderDetailsAction,
  searchOrdersInOrderlist,
  getAwaitingShipmentsAction,
  getAwaitingDeliveriesAction,
  getReceivedAction,
  getReturnsAction,
  getCancellationsAction,
  insertFeedbackAction,
  placeOrderAction,
  MarkAsShipped
}

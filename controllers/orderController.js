const Feedback = require("../models/orderModel");

var loggedUser = 1;

let date_ob = new Date();
// current date
// adjust 0 before single digit date
let date = ("0" + date_ob.getDate()).slice(-2);
// current month
let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
// current year
let year = date_ob.getFullYear();

let dateTime = year + "-" + month + "-" + date + " ";

//should get feedback from request
const insertFeedbackAction = (req, res) => {
  //console.log(req.body)
  Feedback.addFeedback(req.body, loggedUser)
    .then((success) => {
      res.statusCode = 200;
      res.set("Content-Type", "application/json");
      res.json({ success: true, insertId: success.insertId });
    })
    .catch((err) => {
      res.statusCode = 500;
      res.set("Content-Type", "application/json");
      res.json({ success: false, message: err });
    });
};

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

exports.insertFeedbackAction = insertFeedbackAction;
exports.placeOrderAction = placeOrderAction;
exports.getOrderDetailsAction = getOrderDetailsAction;

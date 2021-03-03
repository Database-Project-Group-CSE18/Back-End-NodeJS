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

const Feedback = require("../models/orderModel");

//should get feedback from request
const insertFeedbackAction = (req, res) => {
  console.log(req.body);
  Feedback.addFeedback(req.body, req.session.user.user_id)
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
          console.log(order);
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
  console.log(req.body.order_id);
  OrderModel.markasShipped(req.body.order_id, dateTime)
    .then((orders) => {
      res.statusCode = 200;
      res.set("Content-Type", "application/json");
      res.json({ success: true, orders: orders });
    })
    .catch((err) => {
      res.statusCode = 500;
      res.set("Content-Type", "application/json");
      res.json({ success: false, message: err });
      console.log(err);
    });
};

//check this out

const generateQuaterReportAction = (req, res) => {
  let year = req.body.year;
  let firstQuarterStartDate = year + "/01/01";
  let firstQuarterEndDate = year + "/03/31";

  let secondQaurterStartDate = year + "/04/01";
  let secondQaurterEndDate = year + "/06/30";

  let thirdQuarterStartDate = year + "/07/01";
  let thirdQuarterEndDate = year + "/09/30";

  let fourthQuarterStartDate = year + "/10/01";
  let fourthQuarterEndDate = year + "12/31";

  let first_quart_det;
  let second_quart_det;
  let third_quart_det;
  let fourth_quart_det;
  let all_items;

  OrderModel.generateQuarterReport(firstQuarterStartDate, firstQuarterEndDate)
    .then((result) => {
      first_quart_det = result;
      OrderModel.generateQuarterReport(
        secondQaurterStartDate,
        secondQaurterEndDate
      )
        .then((result) => {
          second_quart_det = result;
          OrderModel.generateQuarterReport(
            thirdQuarterStartDate,
            thirdQuarterEndDate
          )
            .then((result) => {
              third_quart_det = result;
              OrderModel.generateQuarterReport(
                fourthQuarterStartDate,
                fourthQuarterEndDate
              ).then((result) => {
                fourth_quart_det = result;
                OrderModel.getAllItems().then((result) => {
                  all_items = result;
                  res.type("application/json");
                  res.json({
                    first_quart_det: first_quart_det,
                    second_quart_det: second_quart_det,
                    third_quart_det: third_quart_det,
                    fourth_quart_det: fourth_quart_det,
                    all_items: all_items,
                  });
                  res.status(200);
                });
              });
            })
            .catch((err) => {
              res.json({
                message: err,
              });
              res.status(400);
            });
        })
        .catch((err) => {
          res.json({
            message: err,
          });
          res.status(400);
        });
    })
    .catch((err) => {
      res.json({
        message: err,
      });
      res.status(400);
    });
};

//check this out

const genarateSalesRevenueReportAction = (req, res) => {
  let year = req.body.year;
  let firstQuarterStartDate = year + "-01-01";
  let firstQuarterEndDate = year + "-03-31";

  let secondQaurterStartDate = year + "-04-01";
  let secondQaurterEndDate = year + "-06-30";

  let thirdQuarterStartDate = year + "-07-01";
  let thirdQuarterEndDate = year + "-09-30";

  let fourthQuarterStartDate = year + "-10-01";
  let fourthQuarterEndDate = year + "12-31";

  OrderModel.genarateSalesRevenueReport(firstQuarterStartDate, firstQuarterEndDate)
    .then((first_quart_rev) => {
      OrderModel.genarateSalesRevenueReport(
        secondQaurterStartDate,
        secondQaurterEndDate
      )
        .then((second_quart_rev) => {
          OrderModel.genarateSalesRevenueReport(
            thirdQuarterStartDate,
            thirdQuarterEndDate
          )
            .then((third_quart_rev) => {
              OrderModel.genarateSalesRevenueReport(
                fourthQuarterStartDate,
                fourthQuarterEndDate
              ).then((fourth_quart_rev) => {
                OrderModel.getAllItems().then((all_items) => {
                  res.type("application/json");
                  res.json({
                    first_quart_rev: first_quart_rev,
                    second_quart_rev: second_quart_rev,
                    third_quart_rev: third_quart_rev,
                    fourth_quart_rev: fourth_quart_rev,
                    all_items: all_items,
                  });
                  res.status(200);
                });
              });
            })
            .catch((err) => {
              res.json({
                message: err,
              });
              res.status(400);
            });
        })
        .catch((err) => {
          res.json({
            message: err,
          });
          res.status(400);
        });
    })
    .catch((err) => {
      res.json({
        message: err,
      });
      res.status(400);
    });
};

module.exports = {
  genarateSalesRevenueReportAction,
  insertFeedbackAction,
  placeOrderAction,
  getOrderDetailsAction,
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
  MarkAsShipped,
  generateQuaterReportAction,
};

const User = require("../models/userModel");

const getOverviewAction = (req, res) => {
  let date_ob = new Date();
  let date = ("0" + date_ob.getDate()).slice(-2);
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  let year = date_ob.getFullYear();
  let dateToday = year + "-" + month + "-" + date;
  let results = {
    userCount: 0,
    todayRevenue: 0,
    totalRevenue: 0,
    awaitingShipment: 0,
    awaitingDelivery: 0,
  };

  User.getUserCount(dateToday)
    .then((result) => {
      results.userCount = result;
      User.getTodayRevenue(dateToday)
        .then((result) => {
          results.todayRevenue = result;
          User.getTotalRevenue(dateToday)
            .then((result) => {
              results.totalRevenue = result;
              User.getAwaitingShipment()
                .then((result) => {
                  results.awaitingShipment = result;

                  User.getAwaitingDelivery()
                    .then((result) => {
                      results.awaitingDelivery = result;
                      res.type("application/json");
                      res.json({
                        result: results,
                      });
                      res.status(200);
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
  getOverviewAction,
};

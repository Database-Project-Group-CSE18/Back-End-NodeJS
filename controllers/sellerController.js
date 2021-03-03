const Seller = require("../models/userModel");

/**################################################################
                          Get Seller Overview
 ################################################################# */

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

  Seller.getUserCount(dateToday)
    .then((result) => {
      results.userCount = result;
      Seller.getTodayRevenue(dateToday)
        .then((result) => {
          results.todayRevenue = result;
          Seller.getTotalRevenue(dateToday)
            .then((result) => {
              results.totalRevenue = result;
              Seller.getAwaitingShipment()
                .then((result) => {
                  results.awaitingShipment = result;

                  Seller.getAwaitingDelivery()
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

/**################################################################
                          Get seller Details
 ################################################################# */
// get seller details
const getsellerdata = (req, res) => {
    Seller.getUserDetails(req.session.user.user_id)
      .then((user) => {
        Seller.getOrderNumbers(req.session.user.user_id)
          .then((det) => {
            console.log("det",det)
            console.log(det, user);
            res.statusCode = 200;
            res.set("Content-Type", "application/json");
            res.json({ success: true, user: user, det: det });
          })
          .catch((err) => {
            res.statusCode = 500;
            res.set("Content-Type", "application/json");
            res.json({ success: false, message: err });
          });
      })
      .catch((err) => {
        res.statusCode = 500;
        res.set("Content-Type", "application/json");
        res.json({ success: false, message: err });
      });
  };
/**################################################################
                          Update seller details
 ################################################################# */
  //update seller details
  const insertsellerdata = (req, res) => {
    Seller.updateUserDetails(req.body, req.session.user.user_id)
      .then((success) => {
        res.statusCode = 200;
        res.set("Content-Type", "application/json");
        res.json({ success: true });
      })
      .catch((err) => {
        res.statusCode = 500;
        res.set("Content-Type", "application/json");
        res.json({ success: false, message: err });
      });
  };
/**################################################################
                          Update seller password
 ################################################################# */
  //update seller password
  const changePassword = (req,res)=>{    
    console.log(req.body.newpwd,req.body.oldpwd)
    Seller.updatePasswordNew(req.body.newpwd,req.body.oldpwd,req.session.user.user_id)
    .then((success) => {
            res.statusCode = 200;
            res.set("Content-Type", "application/json");
            res.json({ success: true });
          })
          .catch((err) => {
            res.statusCode = 500;
            res.set("Content-Type", "application/json");
            console.log("err_msg",err)
            res.json({ success: false, message: err.message });
          });
  }

  module.exports = {
    getOverviewAction,
    changePassword,
    insertsellerdata,
    getsellerdata
  };

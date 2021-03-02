const Seller = require("../models/userModel");




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
    changePassword,
    insertsellerdata,
    getsellerdata
  };

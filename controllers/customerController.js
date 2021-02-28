const Address = require("../models/addressModel");
const BankCard = require("../models/bankCardModel");
const Customer = require("../models/userModel");
const Order = require("../models/orderModel");
const jwt = require("jsonwebtoken");
const authentication = require("../middleware/Authentication");


/**################################################################
                          Register Customer
 ################################################################# */

const registerAction = (req, res) => {
  console.log("register is called");
  let date_ob = new Date();
  // current date
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);
  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
  // current year
  let year = date_ob.getFullYear();
  // current hours
  let hours = date_ob.getHours();
  // current minutes
  let minutes = date_ob.getMinutes();
  // current seconds
  let seconds = date_ob.getSeconds();
  // prints date in YYYY-MM-DD format
  // console.log(year + "-" + month + "-" + date);
  // prints date & time in YYYY-MM-DD HH:MM:SS format
  let dateTime = year + "-" + month + "-" + date + " ";

  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const phoneNumber = req.body.phoneNumber;
  const password = req.body.password;
  const regDate = dateTime;

  Customer.registerCustomer(
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    regDate
  )
    .then((result) => {
      res.status(200);
      console.log("Successfully added a new customer");
      res.type("application/json");
      res.json({
        result: result,
        message: "Successfully added a new customer",
      });
    })
    .catch((err) => {
      res.status(400);
      console.log(err);
    });
};

/**################################################################
                          Login User
 ################################################################# */
const loginAction = (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log("loginAction is called");
  Customer.loginUser(email, password)
    .then((result) => {
      // console.log(result);
      res.status(200);

      const id = result[0].user_id;
      const token = jwt.sign({ id }, process.env.TOKEN_SECRET, {
        expiresIn: 300, //5 minutes
      });
      if (id == 1) {
        Customer.getSellerDetails(email)
          .then((result) => {
            req.session.user = result;
            console.log(`Seller have Successfully Signed In!`);
            res.type("application/json");
            res.json({
              auth: true, //authentication
              token: token,
              result: result,
              message: `You have Successfully Signed In!`,
            });
          })
          .catch((err) => {
            res.json({
              auth: false, //authentication
              message: err.message,
            });
            res.status(400);
          });
      } else {
        Customer.getCustomerDetails(email)
          .then((result) => {
            req.session.user = result;
            console.log(`Customer have Successfully Signed In!`);
            res.type("application/json");
            res.json({
              auth: true, //authentication
              token: token,
              result: result,
              message: `You have Successfully Signed In!`,
            });
          })
          .catch((err) => {
            res.json({
              auth: false, //authentication
              message: err.message,
            });
            res.status(400);
          });
      }
      res.cookie("jwt", token, { httpOnly: true, maxAge: 1000 * 60 * 60 * 24 });
      // res.cookie("user", result, {httpOnly: true, maxAge: 1000 * 60 * 60 * 24})
    })
    .catch((err) => {
      // console.log(err);
      res.json({
        auth: false, //authentication
        message: err.message,
      });
      res.status(400);
    });
};

/**################################################################
                          User Log out
 ################################################################# */
const logoutAction = (req, res) => {
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.clearCookie("user");
        console.log("after cookie clear");
        res.redirect("/");
      }
    });
  }
};

/**################################################################
              Get User Information( Loggedin, userData)
 ################################################################# */
const checkLoginAction = (req, res) => {
  console.log(" Check whether user is logged in ");
  // console.log(req.cookies.user)
  if (req.cookies.user) {
    if (req.session.user) {
      res.send({ LoggedIn: true, user: req.session.user });
    } else {
      res.send({ LoggedIn: false });
    }
  } else {
    res.send({ LoggedIn: false });
  }
};
// Addresses
/**################################################################
                          Get Customer Address
 ################################################################# */
// logged user should get from request
const getAddressesAction = (req, res) => {
  console.log("session",req.session.user.user_id)
  Address.getAddressByUser(req.session.user.user_id)
    .then((addresses) => {
      res.statusCode = 200;
      res.set("Content-Type", "application/json");
      res.json({ success: true, addresses: addresses });
    })
    .catch((err) => {
      res.statusCode = 500;
      res.set("Content-Type", "application/json");
      res.json({ success: false, message: err });
    });
};
/**################################################################
                          Insert Address
 ################################################################# */
//should get address from request
const insertAddressAction = (req, res) => {
  // console.log(req.body.Address)
  Address.insertAddress(req.body.Address, req.session.user.user_id)
    .then((success) => {
      // console.log(success.insertId);
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
/**################################################################
                          Delete Address
 ################################################################# */
const deleteAddressAction = (req, res) => {
  console.log(req.body.id);
  Address.deleteAddress(req.body.id)
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

// Bank Card Controllers
/**################################################################
                          Get Bank Card
 ################################################################# */
// logged user should get from request
const getBankCardsAction = (req, res) => {
  BankCard.getBankCards(req.session.user.user_id)
    .then((bankCards) => {
      res.statusCode = 200;
      res.set("Content-Type", "application/json");
      res.json({ success: true, bankCards: bankCards });
    })
    .catch((err) => {
      res.statusCode = 500;
      res.set("Content-Type", "application/json");
      res.json({ success: false, message: err });
    });
};
/**################################################################
                          Insert Bank Card
 ################################################################# */
//should get bank card details from request
const insertBankCardsAction = (req, res) => {
  BankCard.insertBankCard(req.body.CardDetails, req.session.user.user_id)
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
                          Delete Bank Card
 ################################################################# */
const deleteBankCardAction = (req, res) => {
  console.log(req.body);
  BankCard.deleteBankCard(req.body.card_id)
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
                          Get User Details
 ################################################################# */
//Customer details controllers

// get user details
const getUserDetails = (req, res) => {
  Customer.getUserDetails(req.session.user.user_id)
    .then((user) => {
      Customer.getOrderNumbers(req.session.user.user_id)
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
                          Update User Details
 ################################################################# */
const updateUserDetailsAction = (req, res) => {
  Customer.updateUserDetails(req.body, req.session.user.user_id)
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
                          Update Password
 ################################################################# */


const updatePasswordNew = (req,res)=>{    
  console.log(req.body.newpwd,req.body.oldpwd)
  Customer.updatePasswordNew(req.body.newpwd,req.body.oldpwd,req.session.user.user_id)
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



/**################################################################
                          Get all orders
 ################################################################# */


const getAllOrdersAction = (req,res) =>{
  Order.getAllOrders(req.session.user.user_id)
  .then((orders)=>{
    res.statusCode = 200;
    res.set("Content-Type", "application/json");
    // console.log(orders);
    res.json({ success: true, orders:orders});
})
.catch((err) => {
    res.statusCode = 500;
    res.set("Content-Type", "application/json");
    res.json({ success: false, message: err });
  }); 
}

/**################################################################
                          Get order stats
 ################################################################# */

const getOrderStatsAction = (req,res)=>{
  Order.getOrderStats(req.session.user.user_id)
  .then((stats)=>{
    res.statusCode = 200;
    res.set("Content-Type", "application/json");
    res.json({ success: true, stats:stats});
})
.catch((err) => {
    res.statusCode = 500;
    res.set("Content-Type", "application/json");
    res.json({ success: false, message: err });
  }); 
}


/**################################################################
                          update order status
 ################################################################# */

const updateOrderStatusAction = (req,res) =>{
  // console.log(req.body.Order_ID, req.body.Order_status)
  Order.updateOrderStatus(req.body.Order_ID, req.body.Order_status)
  .then((stats)=>{
    res.statusCode = 200;
    res.set("Content-Type", "application/json");
    res.json({ success: true});
})
.catch((err) => {
    res.statusCode = 500;
    res.set("Content-Type", "application/json");
    res.json({ success: false, message: err });
  }); 
}


module.exports = {
  registerAction,
  loginAction,
  checkLoginAction,
  logoutAction,
  getAddressesAction,
  insertAddressAction,
  deleteAddressAction,
  getBankCardsAction,
  insertBankCardsAction,
  deleteBankCardAction,
  updateUserDetailsAction,
  getUserDetails,
  updatePasswordNew,
  getOrderStatsAction,
  getAllOrdersAction,
  updateOrderStatusAction
};

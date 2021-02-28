const Address = require("../models/addressModel");
const BankCard = require("../models/bankCardModel");
const Customer = require("../models/userModel");
const jwt = require("jsonwebtoken");
const authentication = require("../middleware/Authentication");

var loggedUser = 3;

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
  let dateTime =
    year +
    "-" +
    month +
    "-" +
    date +
    " " +
    hours +
    ":" +
    minutes +
    ":" +
    seconds;

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

const logoutAction = (req, res) => {
  if (req.session.user) {
    req.session.destroy((err) => {
      if (err) {
        console.log(err);
      } else {
        res.clearCookie("user");
        res.redirect("/signin");
      }
    });
  }
};

const checkLoginAction = (req, res) => {
  console.log(" Check whether user is logged in ");
  if (req.cookies.user) {
    res.send({ LoggedIn: true, user: req.session.user });
  } else {
    res.send({ LoggedIn: false });
  }
};

// const checkAuth = (req, res) => {
//   const token = req.cookies.jwt;
//     console.log(!token)
//     if(!token){
//         return res.json({
//             auth: false,
//             message: "Unauthorized user"
//         })
//     }
//     else{
//         jwt.verify(token,process.env.TOKEN_SECRET,(err,decoded)=>{

//             if(err){
//                 res.status(400);
//                 res.json({auth:false, message:"Authentication failed, invalid token"});
//             }
//             else{
//               res.json({auth:true, message:"You have authenticated"});
//             }
//         })
//     }
// }

// Address Controllers

// logged user should get from request
const getAddressesAction = (req, res) => {
  Address.getAddressByUser(loggedUser)
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

//should get address from request
const insertAddressAction = (req, res) => {
  // console.log(req.body.Address)
  Address.insertAddress(req.body.Address, loggedUser)
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

const deleteAddressAction = (req, res) => {
  console.log(req.body);
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

// logged user should get from request
const getBankCardsAction = (req, res) => {
  BankCard.getBankCards(loggedUser)
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

//should get bank card details from request
const insertBankCardsAction = (req, res) => {
  BankCard.insertBankCard(req.body.CardDetails, loggedUser)
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

const deleteBankCardAction = (req, res) => {
  console.log(req.body);
  BankCard.deleteBankCard(req.body.cardNumber)
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

//Customer details controllers

const getUserDetails = (req, res) => {
  Customer.getUserDetails(loggedUser)
    .then((user) => {
      Customer.getOrderNumbers(loggedUser)
        .then((det) => {
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

const updateUserDetailsAction = (req, res) => {
  Customer.updateUserDetails(req.body, loggedUser)
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

const getPwdAction = (req, res) => {
  Customer.getPwd(loggedUser)
    .then((pwd) => {
      res.statusCode = 200;
      res.set("Content-Type", "application/json");
      res.json({ success: true, pwd: pwd });
    })
    .catch((err) => {
      res.statusCode = 500;
      res.set("Content-Type", "application/json");
      res.json({ success: false, message: err });
    });
};

const updatePasswordAction = (req, res) => {
  console.log(req.body);
  Customer.updatePassword(req.body.newpwd, loggedUser)
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
  updatePasswordAction,
  getPwdAction,
};

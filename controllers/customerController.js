const Customer = require("../models/userModel");
const jwt = require("jsonwebtoken");
const authentication = require("../middleware/Authentication");

var loggedUser = 1;

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

  const userType = "Customer";
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const phoneNo = req.body.phoneNumber;
  const password = req.body.password;
  const regDate = dateTime;

  Customer.registerCustomer(
    userType,
    firstName,
    lastName,
    email,
    phoneNo,
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
  Customer.loginCustomer(email, password)
    .then((result) => {
      
      // console.log(req.session.user)
      res.status(200);

      const id= result[0].User_ID;
      const token = jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn: 300, //5 minutes
      })
      req.session.user = result;
      res.cookie("jwt", token, {httpOnly: true, maxAge: 1000 * 60 * 60 * 24})
      console.log(`You have Successfully Signed In!`);
      res.type("application/json");
      res.json({
        auth: true, //authentication
        token: token,
        result: result,
        message: `You have Successfully Signed In!`,
      });
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

const checkLoginAction = (req, res) => {
  console.log(req.session.user)
  if (req.session.user) {
    res.send( {LoggedIn: true, user : req.session.user})
  } else {
    res.send( {LoggedIn: false})
  }
}

const checkAuth = (req, res) => {
  const token = req.cookies.jwt;
    console.log(!token)
    if(!token){
        return res.json({
            auth: false,
            message: "Unauthorized user"
        })
    }
    else{
        jwt.verify(token,process.env.TOKEN_SECRET,(err,decoded)=>{
          
            if(err){
                res.status(400);
                res.json({auth:false, message:"Authentication failed, invalid token"});
            }
            else{
              res.json({auth:true, message:"You have authenticated"});
            }
        })
    }
}

module.exports = {
  registerAction,
  loginAction,
  checkLoginAction,
  checkAuth
};

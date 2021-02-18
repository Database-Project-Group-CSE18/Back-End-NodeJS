const Customer = require("../models/userModel");

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
    .then(result => {
        res.status(200);
        console.log("Successfully added a new customer");
        res.type("application/json");
        res.json({result : result, msg : "Successfully added a new customer"});
    })
    .catch(err => {
        res.status(400);
        console.log(err);
    });
};


module.exports = {
  registerAction
};

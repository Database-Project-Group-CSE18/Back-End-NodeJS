const { resourceUsage } = require('process');
const Address = require('../model/addressModel');
const BankCard  = require('../model/bankCardModel');
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
  



// Address Controllers

// logged user should get from request
const getAddressesAction = (req,res)=>{
    Address.getAddressByUser(loggedUser)
    .then((addresses)=>{
        res.statusCode = 200;
        res.set("Content-Type", "application/json");
        res.json({ success: true, addresses: addresses });
    })
    .catch((err) => {
        res.statusCode = 500;
        res.set("Content-Type", "application/json");
        res.json({ success: false, message: err });
      });      
}

//should get address from request
const insertAddressAction = (req,res)=>{
    Address.insertAddress(req.body.addresses)
    .then((success)=>{
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

 
const deleteAddressAction  = (req,res)=>{
    Address.deleteAddress(req.body.Address_ID)
    .then((success)=>{
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


// Bank Card Controllers

// logged user should get from request
const getBankCardsAction = (req,res)=>{
    BankCard.getBankCards(loggedUser)
    .then((bankCards)=>{
        res.statusCode = 200;
        res.set("Content-Type", "application/json");
        res.json({ success: true, bankCards: bankCards });
    })
    .catch((err) => {
        res.statusCode = 500;
        res.set("Content-Type", "application/json");
        res.json({ success: false, message: err });
      });      
}

//should get bank card details from request
const insertBankCardsAction = (req,res)=>{
    BankCard.insertBankCard(req.body.cardDetails)
    .then((success)=>{
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


const deleteBankCardAction  = (req,res)=>{
    console.log(req.body);
    BankCard.deleteBankCard(req.body.Card_Number)
    .then((success)=>{
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
    getAddressesAction,
    insertAddressAction,
    deleteAddressAction,
    getBankCardsAction,
    insertBankCardsAction,
    deleteBankCardAction

};


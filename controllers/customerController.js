const { resourceUsage } = require('process');
const Address = require('../model/addressModel');
const BankCard  = require('../model/bankCardModel');

var loggedUser = 1;

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
    getAddressesAction,
    insertAddressAction,
    deleteAddressAction,
    getBankCardsAction,
    insertBankCardsAction,
    deleteBankCardAction

}
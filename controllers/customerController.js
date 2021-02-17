const { resourceUsage } = require('process');
const Customer = require('../model/customerModel');


var loggedUser = 1;


const getAddresses = (req,res,next)=>{
    Customer.getAddressByUser(loggedUser)
    .then((result)=>{
        console.log(result)
    }

    )
    
   
}

getAddresses();

module.exports = {
    getAddresses
}
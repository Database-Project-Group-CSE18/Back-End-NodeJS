<<<<<<< HEAD
const Customer = require('../models/customerModel');


const getAllAddress = (req, res) => {
    
        // .then((employees) => {
        //     res.statusCode = 200;
        //     res.setHeader('Content-Type', 'application/json');
        //     res.json(employees);
        // }, (err) => next(err))
        // .catch((err) => next(err));
}

const registerAction = (req, res) => {
    
}
=======
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
>>>>>>> 478aece5a6d9013698833309701596f5ad5b3f54

module.exports = {
    getAddresses
}
const Feedback = require('../models/orderModel');

//var loggedUser = 1;


//should get feedback from request
const insertFeedbackAction = (req,res)=>{
    console.log(req.body)
    Feedback.addFeedback(req.body,req.session.user.user_id)
    .then((success)=>{
        res.statusCode = 200;
        res.set("Content-Type", "application/json");
        res.json({ success: true, insertId:success.insertId});
    })
    .catch((err) => {
        res.statusCode = 500;
        res.set("Content-Type", "application/json");
        res.json({ success: false, message: err });
      });      
}


const placeOrderAction = (req,res)=>{
    console.log(req.body)
    Feedback.placeOrder()
    .then((success)=>{
        res.statusCode = 200;
        res.set("Content-Type", "application/json");
        res.json({ success: true, insertId:success.insertId});
    })
    .catch((err) => {
        res.statusCode = 500;
        res.set("Content-Type", "application/json");
        res.json({ success: false, message: err });
      });      
}


exports.insertFeedbackAction = insertFeedbackAction;
exports.placeOrderAction = placeOrderAction;
const db = require('../config/database');

const updateOrderStatus = async(order_id,new_status)=>{

    return new Promise((resolve, reject) => {
        db.query("UPDATE Order set Order_status = ? where Order_ID = ?", [order_id,new_status],
        (error, results, fields) => {
          if (!error) {
            resolve(results);
          } else {
            reject(error);
          }
        });
      });
}

const addFeedback = (feedback,loggedUser)=>{
  console.log(feedback);
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO feedback (User_ID,Item_ID,Order_ID,Rate,Comment) VALUES (?,?,?,?,?)";
        db.query(query, [loggedUser,feedback.Item_ID,feedback.Order_ID,feedback.Rating,feedback.Comment],
        (error, results, fields) => {
          if (!error) {
            resolve(results);
          
          } else {
            reject(error);
            console.log(error);
          }
        });
      });
   }



module.exports = {
    updateOrderStatus,
    addFeedback
}
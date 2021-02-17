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



module.exports = {
    updateOrderStatus
}
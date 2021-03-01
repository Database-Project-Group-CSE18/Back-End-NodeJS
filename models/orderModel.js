const db = require('../config/database');

//==========================================================================================================
//Queries for getting data from the database
//==========================================================================================================


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



const getAllOrders = () => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM `order` JOIN `orderitem` ON  `order`.`order_id`=`orderitem`.`order_id` JOIN  `variant` ON `variant`.`variant_id`=`orderitem`.`variant_id`  JOIN `item` ON  `item`.`item_id`=`variant`.`item_id` JOIN `user` ON `user`.`user_id` = `order`.`customer_id` ORDER BY `order`.`ordered_date`",
      (error, results, fields) => {
        if (!error) {
          resolve(results);
        } else {
          reject(error);
        }
      }
    );
  });
};

const searchOrders = (item_name) => {
  
  var query ="SELECT * FROM `order` NATURAL JOIN `orderitem` NATURAL JOIN `variant` NATURAL JOIN `item` JOIN `user` ON `user`.`user_id` = `order`.`customer_id` ORDER BY `order`.`ordered_date`";
  var values = ['%'+item_name+'%']
 

  return new Promise((resolve, reject) => {
    db.query(
      query,
      values,
      (error, results, fields) => {
        if (!error) {
          resolve(results);
        } else {
          reject(error);
        }
      }
    );
  });
}
const getAwaitingShipments = () => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM `order` NATURAL JOIN `orderitem` NATURAL JOIN `variant` NATURAL JOIN `item` JOIN `user` ON `user`.`user_id` = `order`.`customer_id` where order_status=`paid` ORDER BY `order`.`ordered_date`",
      (error, results, fields) => {
        if (!error) {
          resolve(results);
        } else {
          reject(error);
        }
      }
    );
  });
};
const getAwaitingDeliveries = () => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM `order` NATURAL JOIN `orderitem` NATURAL JOIN `variant` NATURAL JOIN `item` JOIN `user` ON `user`.`user_id` = `order`.`customer_id` where order_status=`shipped` ORDER BY `order`.`ordered_date`",
      (error, results, fields) => {
        if (!error) {
          resolve(results);
        } else {
          reject(error);
        }
      }
    );
  });
};
const getCancellations = () => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM `order` NATURAL JOIN `orderitem` NATURAL JOIN `variant` NATURAL JOIN `item` JOIN `user` ON `user`.`user_id` = `order`.`customer_id` where order_status=`cancelled` ORDER BY `order`.`ordered_date`",
      (error, results, fields) => {
        if (!error) {
          resolve(results);
        } else {
          reject(error);
        }
      }
    );
  });
};
const getReturns = () => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM `order` NATURAL JOIN `orderitem` NATURAL JOIN `variant` NATURAL JOIN `item` JOIN `user` ON `user`.`user_id` = `order`.`customer_id` where order_status=`returned` ORDER BY `order`.`ordered_date`",
      (error, results, fields) => {
        if (!error) {
          resolve(results);
        } else {
          reject(error);
        }
      }
    );
  });
};
const getReceived = () => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT * FROM `order` NATURAL JOIN `orderitem` NATURAL JOIN `variant` NATURAL JOIN `item` JOIN `user` ON `user`.`user_id` = `order`.`customer_id` where order_status=`delivered` ORDER BY `order`.`ordered_date`",
      (error, results, fields) => {
        if (!error) {
          resolve(results);
        } else {
          reject(error);
        }
      }
    );
  });
};


module.exports = {
  updateOrderStatus,
  getAllOrders,
  searchOrders,
  getAwaitingShipments,
  getAwaitingDeliveries,
  getCancellations,
  getReceived,
  getReturns
}
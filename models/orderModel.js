const db = require('../config/database');

//==========================================================================================================
//Queries for getting data from the database
//==========================================================================================================





const updateOrderStatus = (order_id,new_status)=>{
    return new Promise((resolve, reject) => {
        db.query("UPDATE `Order` set order_status = ? where order_id = ?", [new_status,order_id],
        (error, results, fields) => {
          if (!error) {
            resolve(results);
          } else {
            reject(error);
            console.log("query error")
          }
        });
      });
}
const getAllOrders = (loggedUser)=>{
  return new Promise((resolve, reject) => {
    const query = "select `Order`.`order_id`,`Order`.`order_status`,`Order`.`tracking_number` as Track,`ordered_date`, JSON_ARRAYAGG(`Item`.`item_id`) AS Item_ID ,JSON_ARRAYAGG(item_name) AS Name,JSON_ARRAYAGG(`Variant`.image) AS Image,JSON_ARRAYAGG(`Variant`.Price) AS Price from `Order`,`OrderItem`,Variant, Item where `OrderItem`.variant_id = Variant.variant_id and Variant.item_id = Item.item_id and `Order`.`order_id` = `OrderItem`.`order_id`  and `Order`.customer_id = ? group by `Order`.`order_id`;";     //JSON_ARRAYAGG(OrderItem_ID) AS Item_ID ,
    db.query(query, [loggedUser],
    (error, results, fields) => {
      if (!error) {
        resolve(results);
      } else {
        reject(error);
        console.log("orders query error")
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


const getOrderStats = (loggedUser)=>{

  const query = "select `order_status`,count(order_id) as Count from `Order` where customer_id = 1 group by `order_status`";
  return new Promise((resolve, reject) => {
    db.query(query, [loggedUser],
    (error, results) => {
      if (!error) {
        console.log("stats",results);
        resolve(results);
      } else {
        reject(error);
      }
    });
  });
}


const placeOrder = ()=>{
  return new Promise((resolve, reject) => {
    db.query(
      `CALL place_order()`,
      Object.values(data),
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



const getAllSellerOrders = () => {
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


// generate customer report details

const generateOrderReport = (start_date,end_date,user_id) =>{
  console.log("sdsd",start_date,end_date,user_id)
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT `Order`.`order_id`as order_id, `Order`.`ordered_date` as ordered_date, `Order`.`order_total` as price, count(`OrderItem`.`variant_id`) as nb_of_items, JSON_ARRAYAGG(`Item`.`item_name`) as description from `Order`,`OrderItem`,Variant, Item where `OrderItem`.variant_id = Variant.variant_id and Variant.item_id = Item.item_id and `Order`.`order_id` = `OrderItem`.`order_id` and ordered_date BETWEEN ? AND ?  and `Order`.customer_id = ? group by `Order`.`order_id` order by `Order`.`ordered_date`",[start_date,end_date,user_id],
      (error, results, fields) => {
        if (!error) {
          resolve(results);
          console.log("query output",results);
        } else {
          reject(error);
        }
      }
    );
  });
}

//generate quarter report details

const generateQuarterReport = (start_date,end_date)=>{
  const query = "SELECT `Item`.`item_id`as item_id, `Item`.`item_name` as item_name, sum(`Order`.`order_total`) as sales from `Order`,`OrderItem`,Variant, Item where `OrderItem`.variant_id = Variant.variant_id and Variant.item_id = Item.item_id and `Order`.`order_id` = `OrderItem`.`order_id` and `Order`.`ordered_date` BETWEEN ? AND ?  group by `Item`.`item_id`"
  return new Promise((resolve, reject) => {
    db.query(
      query,[start_date,end_date],
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


module.exports = {
  updateOrderStatus,
  getAllOrders,
  searchOrders,
  getAwaitingShipments,
  getAwaitingDeliveries,
  getCancellations,
  getReceived,
  getReturns,
  updateOrderStatus,
  addFeedback,
  getOrderStats,
  getAllSellerOrders,
  placeOrder,
  generateOrderReport,
  generateQuarterReport
}
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
      const query = "INSERT INTO feedback (customer_id,item_id,order_id,rate,comment) VALUES (?,?,?,?,?)";
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


const placeOrder = (data, userid, date)=>{
  return new Promise((resolve, reject) => {
    db.query(
      `CALL PlaceOrder(?,?,?,?,?,?)`,
      [userid, data.order_address, data.order_status, data.payment_method, date, data.order_total],
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

const getOrderDetails = (order_id)=>{
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT `Order`.`order_id` AS `order_id`, `Order`.`order_status` AS `order_status`, `Order`.`ordered_date` AS `order_date`, `Order`.`payment_method` AS `payment_method`,`Order`.`ordered_date` AS `ordered_date`,`Order`.`tracking_number` AS `tracking_number`, `Order`.`order_total` AS `order_total`, `OrderAddress`.`first_name` AS `address_firstname`,`OrderAddress`.`last_name` AS `address_lastname`,`OrderAddress`.`state` AS `state`,`OrderAddress`.`city` AS `city`,`OrderAddress`.`street` AS `street`,`OrderAddress`.`zip` AS `zip`,`User`.`email` AS `email`,`User`.`first_name` AS `firstname`,`User`.`last_name` AS `lastname`,`User`.`phone_number` AS `phone_number` FROM `Order` JOIN `OrderAddress` ON `Order`.`order_id` = `OrderAddress`.`address_id` JOIN `User` ON `Order`.`customer_id` = `User`.`user_id` WHERE `Order`.`order_id` = ?",
      [order_id],
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

const getOrderItemsDetails = (order_id)=>{
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT `OrderItem`.`delivery_time` AS `delivery_time`, `OrderItem`.`quantity` AS `ordered_quantity`, `Variant`.`variant_name` AS `variant_name`, `Variant`.`price` AS `price`, `Variant`.`color` AS `color`, `Variant`.`size` AS `size`, `Variant`.`image` AS `image`, `Item`.`item_name` AS `item_name` FROM `OrderItem` JOIN `Variant` ON `OrderItem`.`variant_id` = `Variant`.`variant_id` JOIN `Item` ON `Item`.`item_id` = `Variant`.`item_id` WHERE `order_id` = ?",
      [order_id],
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
      "SELECT `order`.`order_id`,`Order`.`order_status`,`user`.`first_name`,`user`.`last_name`,`variant`.`variant_name`,`variant`.`image`,`variant`.`price`, `orderitem`.`quantity`,`item`.`item_name`,`order`.`ordered_date` FROM `order` JOIN `orderitem` ON  `order`.`order_id`=`orderitem`.`order_id` JOIN  `variant` ON `variant`.`variant_id`=`orderitem`.`variant_id`  JOIN `item` ON  `item`.`item_id`=`variant`.`item_id` JOIN `user` ON `user`.`user_id` = `order`.`customer_id` ORDER BY `order`.`ordered_date` DESC" ,
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

const searchOrders = (order_id) => {
  console.log(order_id)
  var query ="SELECT `order`.`order_id`,`Order`.`order_status`,`user`.`first_name`,`user`.`last_name`,`variant`.`variant_name`,`variant`.`image`,`variant`.`price`, `orderitem`.`quantity`,`item`.`item_name`,`order`.`ordered_date` FROM `order` JOIN `orderitem` ON  `order`.`order_id`=`orderitem`.`order_id` JOIN  `variant` ON `variant`.`variant_id`=`orderitem`.`variant_id`  JOIN `item` ON  `item`.`item_id`=`variant`.`item_id` JOIN `user` ON `user`.`user_id` = `order`.`customer_id` WHERE `order`.`order_id` LIKE ? ORDER BY `order`.`ordered_date` DESC" ;
  var values = ['%'+order_id+'%']
 

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
      "SELECT `order`.`order_id`,`user`.`first_name`,`Order`.`order_status`,`user`.`last_name`,`variant`.`variant_name`,`variant`.`image`,`variant`.`price`, `orderitem`.`quantity`,`item`.`item_name`,`order`.`ordered_date` FROM `order` JOIN `orderitem` ON  `order`.`order_id`=`orderitem`.`order_id` JOIN  `variant` ON `variant`.`variant_id`=`orderitem`.`variant_id`  JOIN `item` ON  `item`.`item_id`=`variant`.`item_id` JOIN `user` ON `user`.`user_id` = `order`.`customer_id` WHERE `order`.`order_status`='paid' ORDER BY `order`.`ordered_date` DESC" ,
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
      "SELECT `order`.`order_id`,`user`.`first_name`,`Order`.`order_status`,`user`.`last_name`,`variant`.`variant_name`,`variant`.`image`,`variant`.`price`, `orderitem`.`quantity`,`item`.`item_name`,`order`.`ordered_date` FROM `order` JOIN `orderitem` ON  `order`.`order_id`=`orderitem`.`order_id` JOIN  `variant` ON `variant`.`variant_id`=`orderitem`.`variant_id`  JOIN `item` ON  `item`.`item_id`=`variant`.`item_id` JOIN `user` ON `user`.`user_id` = `order`.`customer_id` WHERE `order_status`='shipped' ORDER BY `order`.`ordered_date` DESC" ,      (error, results, fields) => {
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
      "SELECT `order`.`order_id`,`user`.`first_name`,`Order`.`order_status`,`user`.`last_name`,`variant`.`variant_name`,`variant`.`image`,`variant`.`price`, `orderitem`.`quantity`,`item`.`item_name`,`order`.`ordered_date` FROM `order` JOIN `orderitem` ON  `order`.`order_id`=`orderitem`.`order_id` JOIN  `variant` ON `variant`.`variant_id`=`orderitem`.`variant_id`  JOIN `item` ON  `item`.`item_id`=`variant`.`item_id` JOIN `user` ON `user`.`user_id` = `order`.`customer_id` WHERE `order_status`='cancelled' ORDER BY `order`.`ordered_date` DESC" ,
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
      "SELECT `order`.`order_id`,`user`.`first_name`,`Order`.`order_status`,`user`.`last_name`,`variant`.`variant_name`,`variant`.`image`,`variant`.`price`, `orderitem`.`quantity`,`item`.`item_name`,`order`.`ordered_date` FROM `order` JOIN `orderitem` ON  `order`.`order_id`=`orderitem`.`order_id` JOIN  `variant` ON `variant`.`variant_id`=`orderitem`.`variant_id`  JOIN `item` ON  `item`.`item_id`=`variant`.`item_id` JOIN `user` ON `user`.`user_id` = `order`.`customer_id` WHERE `order_status`='returned' ORDER BY `order`.`ordered_date` DESC" ,
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
      "SELECT `order`.`order_id`,`user`.`first_name`,`Order`.`order_status`,`user`.`last_name`,`variant`.`variant_name`,`variant`.`image`,`variant`.`price`, `orderitem`.`quantity`,`item`.`item_name`,`order`.`ordered_date` FROM `order` JOIN `orderitem` ON  `order`.`order_id`=`orderitem`.`order_id` JOIN  `variant` ON `variant`.`variant_id`=`orderitem`.`variant_id`  JOIN `item` ON  `item`.`item_id`=`variant`.`item_id` JOIN `user` ON `user`.`user_id` = `order`.`customer_id` WHERE `order_status`='delivered' ORDER BY `order`.`ordered_date` DESC" ,
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

const markasShipped = (order_id,shipped_date) => {
  
  var query ="UPDATE `order` set `order_status`='shipped', `shipped_date`=? Where `order_id`=?" ;
  var values = [shipped_date,order_id]
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

//generate quarter report details     check this out

const generateQuarterReport = (start_date,end_date)=>{
  const query = "SELECT `Item`.`item_id`as item_id, sum(`Order`.`order_total`) as sales from `Order`,`OrderItem`,Variant, Item where `OrderItem`.variant_id = Variant.variant_id and Variant.item_id = Item.item_id and `Order`.`order_id` = `OrderItem`.`order_id` and `Order`.`ordered_date` BETWEEN ? AND ?  group by `Item`.`item_id`"
  return new Promise((resolve, reject) => {
    db.query(query,[start_date,end_date],
      (error, results, fields) => {
        if (!error) {
          resolve(results);
          // console.log("query output",results);
        } else {
          reject(error);
        }
      }
    )})}

const getAllItems = ()=>{
  const query = "SELECT `Item`.`item_id` as item_id, `Item`.`item_name` as item_name from `Item`"
  return new Promise((resolve, reject) => {
    db.query(query,
      (error, results, fields) => {
        if (!error) {
          resolve(results);
        } else {
          reject(error);
        }
      }
    )})
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
  generateQuarterReport,
  markasShipped,
  getOrderDetails,
  getOrderItemsDetails,
  getAllItems
}
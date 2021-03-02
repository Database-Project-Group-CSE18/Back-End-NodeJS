const db = require('../config/database');


const getAllOrders = (loggedUser)=>{
  return new Promise((resolve, reject) => {
    const query = "select `Order`.`order_id`,`Order`.`order_status`,`Order`.`tracking_number` as Track,`ordered_date`,JSON_ARRAYAGG(item_name) AS Name,JSON_ARRAYAGG(`Variant`.image) AS Image,JSON_ARRAYAGG(`Variant`.Price) AS Price from `Order`,`OrderItem`,Variant, Item where `OrderItem`.variant_id = Variant.variant_id and Variant.item_id = Item.item_id and `Order`.`order_id` = `OrderItem`.`order_id`  and `Order`.customer_id = ? group by `Order`.`order_id`;";     //JSON_ARRAYAGG(OrderItem_ID) AS Item_ID ,
    db.query(query, [loggedUser],
    (error, results, fields) => {
      if (!error) {
        resolve(results);
        // console.log(results);
      } else {
        reject(error);
        console.log("orders query error")
      }
    });
  });
}


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





module.exports = {
    updateOrderStatus,
    addFeedback,
    getOrderStats,
    getAllOrders,
    placeOrder,
    getOrderDetails,
    getOrderItemsDetails
}
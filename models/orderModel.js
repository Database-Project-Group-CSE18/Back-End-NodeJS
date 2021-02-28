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


module.exports = {
    updateOrderStatus,
    getOrderStats,
    getAllOrders
}
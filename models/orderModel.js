const db = require('../config/database');


const getAllOrders = (loggedUser)=>{
  return new Promise((resolve, reject) => {
    const query = "select `Order`.`Order_ID`,`Order`.`Order_status`,`Order`.`Tracking _Number` as Track,`Ordered_date`,JSON_ARRAYAGG(OrderItem_ID) AS Item_ID ,JSON_ARRAYAGG(Item_Name) AS Name,JSON_ARRAYAGG(Image) AS Image,JSON_ARRAYAGG(`Order_Item`.Price) AS Price from `Order`,`Order_Item`,Variant, Item where `Order_Item`.Variant_ID = Variant.Variant_ID and Variant.Item_ID = Item.Item_ID and `Order`.`Order_ID` = `Order_Item`.`Order_ID`  and `Order`.User_ID = ? group by `Order`.`Order_ID`";
    db.query(query, [loggedUser],
    (error, results, fields) => {
      if (!error) {
        resolve(results);
        console.log(results);
      } else {
        reject(error);
        console.log("orders query error")
      }
    });
  });
}


const updateOrderStatus = (order_id,new_status)=>{

    return new Promise((resolve, reject) => {
        db.query("UPDATE `Order` set Order_status = ? where Order_ID = ?", [new_status,order_id],
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

  const query = "select `Order_status`,count(Order_ID) as Count from `Order` where User_ID = 2 group by `Order_status`";
  return new Promise((resolve, reject) => {
    db.query(query, [loggedUser],
    (error, results) => {
      if (!error) {
        // console.log(results);
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
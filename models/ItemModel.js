const db = require("../config/database");

//==========================================================================================================
//Queries for getting data from the database
//==========================================================================================================
function getProductReport(startDate, endDate) {
  const sqlSelect =
    "SELECT item_name, category_name, Item.price, num_of_orders AS orders FROM `Order` JOIN `OrderItem` ON `Order`.order_id = OrderItem.order_id JOIN `Variant` ON OrderItem.variant_id = Variant.variant_id JOIN `Item` ON Variant.item_id = Item.item_id WHERE `ordered_date` BETWEEN ? AND ? GROUP BY `item_name` ORDER BY `orders` DESC;";
  return new Promise((resolve, reject) => {
    db.query(sqlSelect, [startDate, endDate], (error, result) => {
      if(!!error) {
        console.log(error);
        reject(error);
      } else {
        resolve(result);
      }
    });
  });
}

function getCategoryReport() {
  const sqlSelect = "SELECT category_name, COUNT(num_of_orders) AS orders FROM `Item` GROUP BY `category_name` ORDER BY `orders` DESC;";
  return new Promise ((resolve, reject) => {
    db.query(sqlSelect, (error, result) => {
      if(!!error) {
        console.log(error);
        reject(error);
      } else {
        resolve(result);
      }
    })
  })
}
const getAllItems = () => {
  return new Promise((resolve, reject) => {
    db.query("CALL DisplayItems()", (error, results, fields) => {
      if (!error) {
        resolve(results);
      } else {
        console.log(error)
        reject(error);
      }
    });
  });
};

const getItemsByCategory = (category) => {
  return new Promise((resolve, reject) => {
    db.query(
      `CALL DisplayItemsByCategory(?)`,
      [category],
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

const getItemByID = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `CALL DisplayItemsByItemID(?)`,
      [parseInt(id)],
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

const getVarientsByItemID = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM variant WHERE item_id = ?`,
      [id],
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

const getFeedbacksByItemID = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT feedback_ID, first_name, last_name, rate, comment FROM feedback JOIN user ON feedback.customer_id = user.user_id WHERE item_id = ?`,
      [id],
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

const getReplyByFeedbackID = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT * FROM reply NATURAL JOIN feedback WHERE Feedback_ID = ?`,
      [id],
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

const getCartItems = (id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT item.item_id, item.item_name, Variant.price, Cart.quantity, Cart.variant_id, Variant.variant_name AS variant, Variant.image FROM Cart 
      JOIN Variant ON Cart.variant_id = Variant.variant_id
      JOIN Item ON item.item_id = Variant.item_id
      WHERE Cart.cart_id = ?`,
      [id],
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

const deleteCartItem = (user_id, variant_id) => {
  return new Promise((resolve, reject) => {
    db.query(
      `DELETE FROM Cart WHERE cart_id = ? AND variant_id = ?`,
      [user_id, variant_id],
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

const getAllCategories = () => {
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT DISTINCT category_name FROM item`,
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

const searchItemsInCategory = (category, item_name) => {
  "SELECT `item_id`, `num_of_orders`, `item_name`, `status`, `category_name`, `description`, AVG(`rate`) AS `rating`, COUNT(`rate`) AS `reviews` , `price`, `image` FROM `Item` NATURAL LEFT JOIN `Feedback` WHERE `category` = ? AND `item_name` LIKE ? GROUP BY `item_name`";

  var query =
    "SELECT `item_id`, `num_of_orders`, `item_name`, `status`, `category_name`, `description`, AVG(`rate`) AS `rating`, COUNT(`rate`) AS `reviews` , `price`, `image` FROM `Item` NATURAL LEFT JOIN `Feedback` WHERE `category` = ? AND `item_name` LIKE ? GROUP BY `item_name`";
  var values = [category, "%" + item_name + "%"];
  if (category === "All Categories") {
    var query =
      "SELECT `item_id`, `num_of_orders`, `item_name`, `status`, `category_name`, `description`, AVG(`rate`) AS `rating`, COUNT(`rate`) AS `reviews` , `price`, `image` FROM `Item` NATURAL LEFT JOIN `Feedback` WHERE `item_name` LIKE ? GROUP BY `item_name`";
    var values = ["%" + item_name + "%"];
  }

  return new Promise((resolve, reject) => {
    db.query(query, values, (error, results, fields) => {
      if (!error) {
        resolve(results);
      } else {
        reject(error);
      }
    });
  });
};



//==========================================================================================================
//Queries for inserting data to the database
//==========================================================================================================

const addToCart = (data) => {
  return new Promise((resolve, reject) => {
    db.query(
      `CALL AddToCart(?,?,?,?)`,
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
};

const addVariants = (data) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO `Variant`(`variant_name`, `price`, `color`, `size`, `specific_detail`, `quantity`, `image`, `item_id` ) VALUES ?",
      [data],
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

const getLastInsertId = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT LAST_INSERT_ID()", (error, results, fields) => {
      if (!error) {
        resolve(results);
      } else {
        reject(error);
      }
    });
  });
};

const addItem = (data) => {
  return new Promise((resolve, reject) => {
    db.query(
      "INSERT INTO `Item`(`category_name`, `description`, `image`, `item_name`, `price`, `status`) VALUES (?,?,?,?,?,?)",
      [
        data.catagory,
        data.description,
        data.image,
        data.item_name,
        data.price,
        data.status,
      ],
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
  getProductReport,
  getLastInsertId,
  addItem,
  addToCart,
  addVariants,
  getAllItems,
  getItemsByCategory,
  getItemByID,
  getFeedbacksByItemID,
  getVarientsByItemID,
  getReplyByFeedbackID,
  getCartItems,
  getAllCategories,
  searchItemsInCategory,
  deleteCartItem,
  getCategoryReport
}

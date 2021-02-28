const db = require("../config/database");


//==========================================================================================================
//Queries for getting data from the database
//==========================================================================================================


const getAllItems = () => {
  return new Promise((resolve, reject) => {
    db.query(
      "CALL DisplayItems()",
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

const getVarientsByItemID = (id) =>{
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

const getFeedbacksByItemID = (id) =>{
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

const getReplyByFeedbackID = (id) =>{
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
}

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
}

const getAllCategories= () =>{
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
  
  var query = `SELECT * FROM Display_item WHERE category = ? AND item_name LIKE ?`;
  var values = [category, '%'+item_name+'%']
  if(category === 'All Categories'){
    var query = `SELECT * FROM Display_item WHERE item_name LIKE ?`;
    var values = ['%'+item_name+'%']
  }

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



exports.getAllItems = getAllItems;
exports.getItemsByCategory = getItemsByCategory;
exports.getItemByID = getItemByID;
exports.getFeedbacksByItemID = getFeedbacksByItemID;
exports.getVarientsByItemID = getVarientsByItemID;
exports.getReplyByFeedbackID =getReplyByFeedbackID;
exports.getCartItems =getCartItems;
exports.getAllCategories =getAllCategories;
exports.searchItemsInCategory = searchItemsInCategory;
exports.deleteCartItem =deleteCartItem;



//==========================================================================================================
//Queries for inserting data to the database
//==========================================================================================================



const addToCart = (data) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO Cart(cart_id, variant_id, quantity, delivery_time) VALUES (?,?,?,?)`,
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

exports.addToCart =addToCart;

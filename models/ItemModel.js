const db = require("../config/database");


//==========================================================================================================
//Queries for getting data from the database
//==========================================================================================================


const getAllItems = () => {
  return new Promise((resolve, reject) => {
    db.query(
      "SELECT Item_ID, Num_of_orders, Item_name, Category, Status, AVG(rate) AS rating, COUNT(rate) AS Reviews , Price, Image FROM item NATURAL LEFT JOIN feedback GROUP BY Item_name",
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
      `SELECT Item_ID, Num_of_orders, Item_name, Category, Status, AVG(rate) AS Rating, COUNT(rate) AS Reviews , Price, Image FROM item NATURAL LEFT JOIN feedback WHERE Category = ? GROUP BY Item_name`,
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
      `SELECT Item_ID, Num_of_orders, Item_name, Category, Status, AVG(rate) AS rating, COUNT(rate) AS Orders , Price, Image, Description FROM item NATURAL LEFT JOIN feedback WHERE Item_ID = ? GROUP BY Item_name`,
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
      `SELECT * FROM variant WHERE Item_ID = ?`,
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
      `SELECT Feedback_ID, First_name, Last_name, Rate, Comment FROM feedback NATURAL JOIN user WHERE Item_ID = ?`,
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
      `SELECT item.Item_ID, item.Item_name, variant.Price, cart_item.Quantity, variant.Variant_name AS variant, variant.image FROM cart_item 
      JOIN variant ON cart_item.Variant_ID = variant.Variant_ID
      JOIN item ON item.Item_ID = variant.Item_ID
      WHERE cart_item.Cart_ID = ?;`,
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

const getAllCategories= () =>{
  return new Promise((resolve, reject) => {
    db.query(
      `SELECT DISTINCT Category FROM item`,
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
  
  var query = `SELECT Item_ID, Num_of_orders, Item_name, Category, Status, AVG(rate) AS rating, COUNT(rate) AS Orders , Price, Image FROM item NATURAL LEFT JOIN feedback WHERE Category = ? AND Item_name LIKE ? GROUP BY Item_name`;
  var values = [category, '%'+item_name+'%']
  if(category === 'All Categories'){
    var query = `SELECT Item_ID, Num_of_orders, Item_name, Category, Status, AVG(rate) AS rating, COUNT(rate) AS Orders , Price, Image FROM item NATURAL LEFT JOIN feedback WHERE Item_name LIKE ? GROUP BY Item_name`;
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



//==========================================================================================================
//Queries for inserting data to the database
//==========================================================================================================



const addToCart = (data) => {
  return new Promise((resolve, reject) => {
    db.query(
      `INSERT INTO cart_item(Cart_ID, Variant_ID, Quantity) VALUES (?,?,?)`,
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

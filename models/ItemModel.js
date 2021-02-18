const db = require('../config/database');

const getAllItems = () => {
  return new Promise((resolve, reject) => {
    db.query("SELECT Item_ID, Num_of_orders, Item_name, Category, Status, AVG(rate) AS rating, COUNT(rate) AS Orders , Price, Image FROM item NATURAL LEFT JOIN feedback GROUP BY Item_name", 
    (error, results, fields) => {
      if (!error) {
        resolve(results);
      } else {
        reject(error);
      }
    });
  });
};

const getItemsByCategory = (category) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT Item_ID, Num_of_orders, Item_name, Category, Status, AVG(rate) AS rating, COUNT(rate) AS Orders , Price, Image FROM item NATURAL LEFT JOIN feedback WHERE Category = '${category}' GROUP BY Item_name`, 
      (error, results, fields) => {
        if (!error) {
          resolve(results);
        } else {
          reject(error);
        }
      });
    });
  };
  
exports.getAllItems = getAllItems;
exports.getItemsByCategory = getItemsByCategory;

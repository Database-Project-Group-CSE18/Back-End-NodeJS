const db = require('../config/database');


const getAddressByUser = (user_id) => {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM Address where User_ID = ?", [user_id],
      (error, results, fields) => {
        if (!error) {
          resolve(results);
        } else {
          reject(error);
        }
      });
    });
  }
  

const insertAddress = (address)=>{
    return new Promise((resolve, reject) => {
        db.query("INSERT INTO Address (User_ID,First_Name,Last_Name,Street,City,State,ZIP) VALUES (?,?,?,?,?,?,?)", [address.User_ID,address.First_Name,address.Last_Name,address.Street,address.City,address.State,address.ZIP],
        (error, results, fields) => {
          if (!error) {
            resolve(results);
          } else {
            reject(error);
          }
        });
      });
   }


const deleteAddress = (address_id)=>{
    
    return new Promise((resolve, reject) => {
        db.query("DELETE FROM Address WHERE Address_ID = ?", [address_id],
        (error, results, fields) => {
          if (!error) {
            resolve(results);
          } else {
            reject(error);
          }
        });
      });
   
}


module.exports = {
    getAddressByUser,
    insertAddress,
    deleteAddress
}
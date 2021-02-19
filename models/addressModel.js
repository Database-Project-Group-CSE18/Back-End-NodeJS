const db = require('../config/database');


const getAddressByUser = (user_id) => {
    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM Address where User_ID = ?";
      db.query(query, [user_id],
      (error, results, fields) => {
        if (!error) {
          resolve(results);
        } else {
          reject(error);
        }
      });
    });
  }
  

const insertAddress = (address,loggedUser)=>{
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO Address (User_ID,First_Name,Last_Name,Street,City,State,ZIP) VALUES (?,?,?,?,?,?,?)";
        db.query(query, [loggedUser,address.firstName,address.lastName,address.street,address.city,address.state,address.zip],
        (error, results, fields) => {
          if (!error) {
            resolve(results);
          
          } else {
            reject(error);
            console.log("query error");
          }
        });
      });
   }


const deleteAddress = (address_id)=>{
    
    return new Promise((resolve, reject) => {
      const query = "DELETE FROM Address WHERE Address_ID = ?";
        db.query(query, [address_id],
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
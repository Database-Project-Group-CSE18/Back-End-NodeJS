const db = require('../config/database');



function registerCustomer(useType, firstName, lastName, email, phoneNo, password, regDate) {
    const sqlInsert = "INSERT INTO user (user_type, first_name, last_name, email, phone_no, password, cart_id, reg_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
    return new Promise((resolve, reject) => {
        db.query(sqlInsert, 
            [useType, firstName, lastName, email, phoneNo, password, 1, regDate],
            (error, result) => {
                if (!!error) {
                    console.log(error);
                    reject(error);
                } else {
                    resolve(result);
                }
            }
            )
    })
}

const getUserDetails = (userID)=>{

    return new Promise((resolve, reject) => {
      const query = "select * from `User` where User_ID=?";
        db.query(query, [userID],
        (error, results, fields) => {
          if (!error) {
            resolve(results);
            
          } else {
            reject(error);
          }
        });
      });
}

const getOrderNumbers = (userID) =>{
  return new Promise((resolve, reject) => {
    const query = "select Order_status,count(Order_ID) from `Order` where User_ID=?  group by Order_status";
      db.query(query, [userID],
      (error, results, fields) => {
        if (!error) {
          resolve(results);
          
        } else {
          reject(error);
        }
      });
    });
}

// const query1 = "SELECT * FROM User where User_ID = ?";
// const query2 = "select Order_status,count(Order_ID) from `Order` where User_ID=? group by Order_status;"
// select First_Name,Last_Name,Order_status,count(Order_ID) from `User` natural join `Order` where User_ID=1 group by Order_status;


const updateUserDetails = (user,loggedUser)=>{
    console.log(user)
    return new Promise((resolve, reject) => {
      const query = "UPDATE User SET First_name = ? , Last_name = ? , Email = ? , Phone_No = ?  where User_ID = ?";
        // console.log(loggedUser);
        db.query(query, [user.firstname,user.lastname,user.Email,parseInt(user.telephone),loggedUser],
        (error, results, fields) => {
          if (!error) {
            resolve(results);
          } else {
            console.log("query error")
            reject(error);
          }
        });
      });
}

const getPwd = (loggedUser)=>{
  return new Promise((resolve, reject) => {
    const query = "SELECT Password FROM User WHERE User_ID = ? ";
      db.query(query, [loggedUser],
      (error, results, fields) => {
        if (!error) {
          resolve(results);
        } else {
          reject(error);
        }
      });
    });
  

}

const updatePassword  = (pwd,loggedUser)=>{

    return new Promise((resolve, reject) => {
      const query = "UPDATE User SET Password = ? ";
        db.query(query, [pwd,loggedUser],
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
    registerCustomer,
    getUserDetails,
    updateUserDetails,
    updatePassword,
    getOrderNumbers,
    getPwd
}


const db = require("../config/database");

const bcrypt = require("bcrypt"); //A library to help you hash passwords.
const saltRounds = 10;

// cookie-parser is a middleware which parses cookies attached to the client request object
// Body-parser is the Node.js body parsing middleware. It is responsible for parsing the incoming request bodies in a middleware before you handle it.
// Session management can be done in node.js by using the express-session module. It helps in saving the data in the key-value form
const bodyParser = require("body-parser");

const session = require("express-session");
const cookieParser = require("cookie-parser");

function registerCustomer(
  useType,
  firstName,
  lastName,
  email,
  phoneNo,
  password,
  regDate
) {
  const sqlInsert =
    "INSERT INTO user (user_type, first_name, last_name, email, phone_no, password, cart_id, reg_date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.log(err);
      }

      db.query(
        sqlInsert,
        [useType, firstName, lastName, email, phoneNo, hash, 1, regDate],
        (error, result) => {
          if (!!error) {
            console.log(error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
  });
}

function loginCustomer(email, password) {
  const sqlSelect = "SELECT * FROM user WHERE email = ?;";
  console.log("LoginModel is called");
  return new Promise((resolve, reject) => {
    db.query(sqlSelect, email, (error, result) => {
      // console.log(result[0].Password);
      if (!!error) {
        console.log(error);
        reject(error);
      }
      if (result.length > 0) {
        bcrypt.compare(password, result[0].Password, (error, response) => {
          if (response) {
            console.log("Userfound");
            resolve(result);
          } else {
            reject({ message: "Wrong email/password combination" });
          }
        });
      } else {
        console.log("User Not found");
        reject({ message: "User does not exist" });
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


          

const getUserDetails = (userID) => {
  return new Promise((resolve, reject) => {
    db.query(
      "select First_Name,Last_Name,Order_status,count(Order_ID) from `User` natural join `Order` where User_ID=? group by Order_status",
      [userID],
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

// const query1 = "SELECT * FROM User where User_ID = ?";
// const query2 = "select Order_status,count(Order_ID) from `Order` where User_ID=? group by Order_status;"
// select First_Name,Last_Name,Order_status,count(Order_ID) from `User` natural join `Order` where User_ID=1 group by Order_status;

const updateUserDetails = (user) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE User SET First_name = ? , Last_name = ? , Email = ? , Phone_No = ? ",
      [user],
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

const updatePassword = (pwd) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE User SET Password = ? ",
      [pwd],
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
  registerCustomer,
  loginCustomer,
  getUserDetails,
  updateUserDetails,
  updatePassword,
  getOrderNumbers,
    getPwd,
};

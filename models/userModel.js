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
  firstName,
  lastName,
  email,
  phoneNumber,
  password,
  regDate
) {
  const sqlProcedure =
    "CALL RegisterCustomer(?, ?, ?, ?, ?, ?)";
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
      if (err) {
        console.log(err);
      }

      db.query(
        sqlProcedure,
        [email, hash, firstName, lastName, phoneNumber, regDate],
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

function loginUser(email, password) {
  const sqlSelect = "SELECT * FROM `User` WHERE email = ? ;"
  console.log("LoginModel is called");
  return new Promise((resolve, reject) => {
    db.query(sqlSelect, email, (error, result) => {
      // console.log(result[0].password);
      if (!!error) {
        console.log(error);
        reject(error);
      }
      if (result.length > 0) {
        bcrypt.compare(password, result[0].password, (error, response) => {
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

function getCustomerDetails(email) {
  const sqlSelect = "SELECT * FROM `CustomerDetails` WHERE email = ? ;"
  return new Promise((resolve, reject) => {
    db.query(sqlSelect, email, (error, result) => {
      if (!!error) {
        console.log(error);
        reject(error);
      } else {
        resolve(result[0]);
      }
    });
  });
}

function getSellerDetails(email) {
  const sqlSelect = "SELECT * FROM `SellerDetails` WHERE email = ? ;"
  return new Promise((resolve, reject) => {
    db.query(sqlSelect, email, (error, result) => {
      // console.log(result[0].password);
      if (!!error) {
        console.log(error);
        reject(error);
      } else {
        resolve(result[0]);
      }
    });
  });
}




// const query1 = "SELECT * FROM User where User_ID = ?";
// const query2 = "select Order_status,count(Order_ID) from `Order` where User_ID=? group by Order_status;"
// select First_Name,Last_Name,Order_status,count(Order_ID) from `User` natural join `Order` where User_ID=1 group by Order_status;

        

const getUserDetails = (userID)=>{

  return new Promise((resolve, reject) => {
    const query = "select * from `User` where user_id=?";
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
  const query = "select order_status,count(order_id) from `Order` where customer_id=?  group by order_status";
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

const updateUserDetails = (user) => {
  return new Promise((resolve, reject) => {
    db.query(
      "UPDATE `User` SET first_name = ? , last_name = ? , email = ? , phone_number = ?  where user_id = ? ",
      [user.first_name,user.last_name,user.email,user.phone_number,user.user_id],
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


// const getPwd = (loggedUser)=>{
//   return new Promise((resolve, reject) => {
//     const query = "SELECT Password FROM User WHERE User_ID = ? ";
//       db.query(query, [loggedUser],
//       (error, results, fields) => {
//         if (!error) {
//           resolve(results);
//         } else {
//           reject(error);
//         }
//       });
//     });
// }


const updatePasswordNew = (newpwd,oldpwd,loggedUser) =>{     // test this function
  // console.log(newpwd,oldpwd)
  return new Promise((resolve, reject) => {
    const query = "SELECT password FROM User WHERE user_id = ? ";
      db.query(query, [loggedUser],
      (error, results, fields) => {
        // console.log("results",results[0].password)
        if (!error) {
          bcrypt.compare(oldpwd, results[0].password, (error, response) => {
            console.log("Response",response,results[0].password,oldpwd);
            if (response) {      
              const query1 = "UPDATE User SET password = ? where user_id=?";
              db.query(query1,[newpwd,loggedUser],
                (error, results, fields) => {
                  if (!error) {
                    console.log("query done")
                    resolve(results);
                  } else {
                    reject({message:"query error"});
                  }
                }
                )
            } else {
              reject({ message: "Incorrect Password Entered" });
            }
          })

          // resolve(results);
        } else {
          reject({message:"query error"});
        }
      });
    });
  
}


// const updatePassword = (pwd) => {
//   return new Promise((resolve, reject) => {
//     db.query(
//       "UPDATE User SET Password = ? ",
//       [pwd],
//       (error, results, fields) => {
//         if (!error) {
//           resolve(results);
//         } else {
//           reject(error);
//         }
//       }
//     );
//   });
// };


module.exports = {
  registerCustomer,
  loginUser,
  getCustomerDetails,
  getSellerDetails,
  getUserDetails,
  updateUserDetails,
  // updatePassword,
  getOrderNumbers,
  // getPwd,
  updatePasswordNew
};

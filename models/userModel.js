const db = require("../config/database");
const bcrypt = require("bcrypt"); //A library to help you hash passwords.
const saltRounds = 10;
// cookie-parser is a middleware which parses cookies attached to the client request object
// Body-parser is the Node.js body parsing middleware. It is responsible for parsing the incoming request bodies in a middleware before you handle it.
// Session management can be done in node.js by using the express-session module. It helps in saving the data in the key-value form

/**################################################################
                          Register Customer
 ################################################################# */
function registerCustomer(
  firstName,
  lastName,
  email,
  phoneNumber,
  password,
  regDate
) {
  const sqlInsert =
    "INSERT INTO user (User_Type, First_name, Last_name, email, Phone_No, Password, Cart_ID, Reg_Date) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
  const sqlCheckUniqueEmail = "SELECT * FROM User WHERE email = ?";
  const sqlProcedure = "CALL RegisterCustomer(?, ?, ?, ?, ?, ?)";
  return new Promise((resolve, reject) => {
    db.query(sqlCheckUniqueEmail, [email], (errs, res) => {
      if (!!errs) {
        console.log(error);
        reject(error);
      } else {
        if (res.length > 0) {
          reject({ message: "Please select another email!" });
        } else {
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
        }
      }
    });
  });
}
/**################################################################
                          Login User
 ################################################################# */
function loginUser(email, password) {
  const sqlSelect = "SELECT * FROM `User` WHERE email = ? ;";
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
            resolve(result);
          } else {
            reject({ message: "The password you entered is incorrect" });
          }
        });
      } else {
        reject({ message: "User does not exist!" });
      }
    });
  });
}
/**################################################################
                    Get Specific Customer Details
 ################################################################# */
function getCustomerDetails(email) {
  const sqlSelect = "SELECT * FROM `CustomerDetails` WHERE email = ? ;";
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
/**################################################################
                          Get Seller Details
 ################################################################# */
function getSellerDetails(email) {
  const sqlSelect = "SELECT * FROM `SellerDetails` WHERE email = ? ;";
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




const updatePasswordNew = (newpwd,oldpwd,loggedUser) =>{     
  // console.log(newpwd,oldpwd)
  return new Promise((resolve, reject) => {
    const query = "SELECT password FROM User WHERE user_id = ? ";
      db.query(query, [loggedUser],
      (error, results, fields) => {
        console.log("results",results[0].password)
        if (!error) {
          bcrypt.compare(oldpwd, results[0].password, (error, response) => {
            console.log("Response",response,results[0].password,oldpwd);
            if (response) {  
              bcrypt.hash(newpwd, saltRounds, (err, hash) => {
                if (err) {
                  console.log("hash error");
                }
                const query1 = "UPDATE User SET password = ? where user_id=?";
                db.query(
                  query1,
                  [hash,loggedUser],
                  (error, result) => {
                    if (!!error) {
                      console.log("query error");
                      reject(error);
                    } else {
                      resolve(result);
                    }
                  }
                );
              });        
             
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

module.exports = {
  registerCustomer,
  loginUser,
  getCustomerDetails,
  getSellerDetails,
  getUserDetails,
  updateUserDetails,
  getOrderNumbers,
  updatePasswordNew
};

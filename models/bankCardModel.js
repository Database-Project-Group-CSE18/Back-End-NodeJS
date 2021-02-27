const db = require('../config/database');

const getBankCards = (userID)=>{

    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM BankCard where customer_id = ?";
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

const insertBankCard = (bank_card,loggedUser)=>{
    console.log(bank_card,loggedUser);
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO Bank_Card (Card_Number,User_ID,Bank_Name,Owner,CVV,Exp_Date) VALUES (?,?,?,?,?,?)";
        db.query(query, [bank_card.Card_Number,loggedUser,bank_card.Bank_Name,bank_card.Owner,bank_card.CVV,bank_card.Exp_Date],
        (error, results, fields) => {
          if (!error) {
            resolve(results);
          } else {
            console.log("query error");
            reject(error);
          }
        });
      });
    }


const deleteBankCard = (card_number)=>{

    return new Promise((resolve, reject) => {
      const query = "DELETE FROM Bank_Card WHERE card_number = ?"
        db.query(query, [card_number],
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
    getBankCards,
    insertBankCard,
    deleteBankCard

}
const db = require('../config/database');


const getBankCards = (userID)=>{

    return new Promise((resolve, reject) => {
        db.query("SELECT * FROM Bank_Card where User_ID = ?", [user_id],
        (error, results, fields) => {
          if (!error) {
            resolve(results);
          } else {
            reject(error);
          }
        });
      });
}

const insertBankCard = (bank_card)=>{

    return new Promise((resolve, reject) => {
        db.query("INSERT INTO Bank_Card (Card_Number,User_ID,Bank_Name,Owner,CVV,Exp_Date) VALUES (?,?,?,?,?,?)", [bank_card.Card_Number,bank_card.User_ID,bank_card.Bank_Name,bank_card.Owner,bank_card.CVV,bank_card.Exp_Date],
        (error, results, fields) => {
          if (!error) {
            resolve(results);
          } else {
            reject(error);
          }
        });
      });
    }


const deleteBankCard = (card_number)=>{

    return new Promise((resolve, reject) => {
        db.query("DELETE FROM Bank_Card WHERE card_number = ?", [card_number],
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
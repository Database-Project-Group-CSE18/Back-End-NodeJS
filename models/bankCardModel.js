const db = require('../config/database');

const Cryptr = require('cryptr');     // a library to encrypt the bank card details
const cryptr = new Cryptr(process.env.CryptR_key);

const getBankCards = (userID)=>{

    return new Promise((resolve, reject) => {
      const query = "SELECT * FROM BankCard where customer_id = ?";
        db.query(query, [userID],
        (error, results, fields) => {
          if (!error) {     
            for(var i= 0;i<results.length;i++){
              var cardNumber = results[i].card_number
              var decNum = cryptr.decrypt(cardNumber)
              results[i].card_number = decNum
              
            }
            // console.log("bank cards:",results)
            resolve(results);
          } else {
            reject(error);
          }
        });
      });
}


const insertBankCard = (bank_card,loggedUser)=>{
  const encryptedCardNumber = cryptr.encrypt(bank_card.card_number);
  const encryptedcvv = cryptr.encrypt(bank_card.cvv)
    // console.log(bank_card,loggedUser);
    return new Promise((resolve, reject) => {
      const query = "INSERT INTO BankCard (card_number,customer_id,bank_name,owner,cvv,exp_date,card_type) VALUES (?,?,?,?,?,?,?)";
        db.query(query, [encryptedCardNumber,loggedUser,bank_card.bank_name,bank_card.owner,encryptedcvv,bank_card.exp_date,bank_card.card_type],
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


const deleteBankCard = (card_id)=>{
   
    return new Promise((resolve, reject) => {  
      const query = "DELETE FROM BankCard WHERE card_id = ?"
        db.query(query, [card_id],
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
    deleteBankCard,
  
}
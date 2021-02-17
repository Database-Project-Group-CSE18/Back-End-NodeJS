const { async } = require('rxjs');
const db = require('../config/database');


//user details

const getUserDetails = async(userID)=>{
    const query1 = "SELECT * FROM User where User_ID = ?";
    const query2 = "select Order_status,count(Order_ID) from `Order` where User_ID=? group by Order_status;"
    const out1 = await db.query(query1,[userID]);
    const out2 = await db.query(query2,[userID])
    return {"user":out1.rows , "orders":out2.rows};
}

// select First_Name,Last_Name,Order_status,count(Order_ID) from `User` natural join `Order` where User_ID=1 group by Order_status;

// First_Name Last_name Email Phone_No

const updateUserDetails = async(user)=>{
    const query = "UPDATE User SET First_name = ? , Last_name = ? , Email = ? , Phone_No = ? ";
    await db.query(query,[user.First_Name,user.Last_Name,user.Email,user.Phone_No]);
}

const updatePassword  = async(pwd)=>{
    const query = "UPDATE User SET Password = ? ";
    await db.query(query,[pwd]);
}


// Customer Address
const getAddressByUser = async(userID)=>{
    const query = "SELECT * FROM Address where User_ID = ?";
    const out = await db.query(query,[userID]);
    return out.rows;
}

const insertAddress = async(address)=>{
    const query = "INSERT INTO Address (User_ID,First_Name,Last_Name,Street,City,State,ZIP) VALUES (?,?,?,?,?,?,?)";
    await db.query(query,[address.User_ID,address.First_Name,address.Last_Name,address.Street,address.City,address.State,address.ZIP]);
}

const deleteAddress = async(address_id)=>{
    const query = "DELETE FROM Address WHERE Address_ID = ?";
    await db.query(query,[address_id]);
}


//Customer bank card

const getBankCards = async(userID)=>{
    const query = "SELECT * FROM Bank_Card where User_ID = ?";
    const out = await db.query(query,[userID]);
    return out.rows;
}

const insertBankCard = async(bank_card)=>{
    const query = "INSERT INTO Bank_Card (Card_Number,User_ID,Bank_Name,Owner,CVV,Exp_Date) VALUES (?,?,?,?,?,?)";
    await db.query(query,[bank_card.Card_Number,bank_card.User_ID,bank_card.Bank_Name,bank_card.Owner,bank_card.CVV,bank_card.Exp_Date]);
}

const deleteBankCard = async(card_number)=>{
    const query = "DELETE FROM Bank_Card WHERE card_number = ?";
    await db.query(query,[card_number]);
}





module.exports = {
    getAddressByUser,
    insertAddress,
    deleteAddress,
    getBankCards,
    insertBankCard,
    deleteBankCard,
    getUserDetails,
    updateUserDetails,
    updatePassword
}
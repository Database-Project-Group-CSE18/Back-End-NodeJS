const { async } = require('rxjs');
const db = require('../db/db');


//user details

const getUserDetails = async(userID)=>{
    try{
    const query1 = "SELECT * FROM User where User_ID = ?";
    const query2 = "select Order_status,count(Order_ID) from `Order` where User_ID=? group by Order_status;"
    const out1 = await db.query(query1,[userID]);
    const out2 = await db.query(query2,[userID])
    return {"user":out1.rows , "orders":out2.rows};
    }catch(e){
        return "db_err";
    }
}

// select First_Name,Last_Name,Order_status,count(Order_ID) from `User` natural join `Order` where User_ID=1 group by Order_status;

// First_Name Last_name Email Phone_No

const updateUserDetails = async(user)=>{
    try{
    const query = "UPDATE User SET First_name = ? , Last_name = ? , Email = ? , Phone_No = ? ";
    await db.query(query,[user.First_Name,user.Last_Name,user.Email,user.Phone_No]);
    }catch(e){
        return "db_err";
    }
}

const updatePassword  = async(pwd)=>{
    try{
    const query = "UPDATE User SET Password = ? ";
    await db.query(query,[pwd]);
    }catch(e){
        return "db_err";
    }
}


// Customer Address
const getAddressByUser = async(userID)=>{
    try{
    const query = "SELECT * FROM Address where User_ID = ?";
    const out = await db.query(query,[userID]);
    return out.rows;
    }catch(e){
        return "db_err";
    }
}

const insertAddress = async(address)=>{
    try{
    const query = "INSERT INTO Address (User_ID,First_Name,Last_Name,Street,City,State,ZIP) VALUES (?,?,?,?,?,?,?)";
    await db.query(query,[address.User_ID,address.First_Name,address.Last_Name,address.Street,address.City,address.State,address.ZIP]);
    }catch(e){
        return "db_err";
    }
}

const deleteAddress = async(address_id)=>{
    try{
    const query = "DELETE FROM Address WHERE Address_ID = ?";
    await db.query(query,[address_id]);
    }catch(e){
        return "db_err"
    }
}


//Customer bank card

const getBankCards = async(userID)=>{
    try{
    const query = "SELECT * FROM Bank_Card where User_ID = ?";
    const out = await db.query(query,[userID]);
    return out.rows;
    }catch(e){
        return "db_err"
    }
}

const insertBankCard = async(bank_card)=>{
    try{
    const query = "INSERT INTO Bank_Card (Card_Number,User_ID,Bank_Name,Owner,CVV,Exp_Date) VALUES (?,?,?,?,?,?)";
    await db.query(query,[bank_card.Card_Number,bank_card.User_ID,bank_card.Bank_Name,bank_card.Owner,bank_card.CVV,bank_card.Exp_Date]);
    }catch(e){
        return "db_err"
    }
}

const deleteBankCard = async(card_number)=>{
    try{
    const query = "DELETE FROM Bank_Card WHERE card_number = ?";
    await db.query(query,[card_number]);
    }catch(e){
        return "db_err"
    }
}


// Order

// const getOrders = async(user_id)=>{
//     const query = "SELECT "
// } 

const updateOrderStatus = async(order_id,new_status)=>{
    try{
    const query = "UPDATE Order set Order_status = ? where Order_ID = ?";
    await db.query(query,[order_id,new_status]);
    }catch(e){
        return "db_err"
    }
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
    updatePassword,
    updateOrderStatus
}
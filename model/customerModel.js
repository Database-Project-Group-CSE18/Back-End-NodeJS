const db = require('../db/db');

const getAddressByUser = async(userID)=>{
    const query = "SELECT * FROM Address where User_ID = ?";
    const out = await db.query(query,[userID]);
    return out.rows;
}
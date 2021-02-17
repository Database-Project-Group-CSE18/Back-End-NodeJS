const db = require('../config/database');

const getAllItems = ()=>{
    const query = "SELECT * FROM Item";
    const out = db.query(query);
    return out;
}

exports.getAllItems =  getAllItems;
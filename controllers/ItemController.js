const ItemModel = require("../model/ItemModel");
const db = require("../config/database");

const getAllItems = (req, res) => {
  ItemModel.getAllItems()
    .then((items) => {
      console.log(items);
      res.statusCode = 200;
      res.set("Content-Type", "application/json");
      res.json({ success: true, items: items });
    })
    .catch((err) => {
      res.statusCode = 500;
      res.set("Content-Type", "application/json");
      res.json({ success: false, message: "Error while getting data" });
    });
};

exports.getAllItems = getAllItems;

const ItemModel = require("../model/ItemModel");
const db = require("../config/database");

const getAllItems = (req, res) => {
  ItemModel.getAllItems()
    .then((items) => {
      res.statusCode = 200;
      res.set("Content-Type", "application/json");
      res.json({ success: true, items: items });
    })
    .catch((err) => {
      res.statusCode = 500;
      res.set("Content-Type", "application/json");
      res.json({ success: false, message: err });
    });
};

const getItemsByCategory = (req, res) => {
    ItemModel.getItemsByCategory(req.params.category)
      .then((items) => {
        res.statusCode = 200;
        res.set("Content-Type", "application/json");
        res.json({ success: true, items: items });
      })
      .catch((err) => {
        res.statusCode = 500;
        res.set("Content-Type", "application/json");
        res.json({ success: false, message: err });
      });
  };
exports.getAllItems = getAllItems;
exports.getItemsByCategory = getItemsByCategory;

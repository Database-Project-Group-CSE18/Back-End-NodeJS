const ItemModel = require("../models/ItemModel");
const db = require("../config/database");

const getAllItemsAction = (req, res) => {
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

const getItemsByCategoryAction = (req, res) => {
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

const getItemByIDAction = (req, res) => {
  ItemModel.getItemByID(req.params.Item_id)
    .then((items) => {
      if (items.length !== 0) {
        item = items[0];
        ItemModel.getFeedbacksByItemID(item.item_id)
          .then((feedbacks) => {
            item.feedbacks = feedbacks;
            ItemModel.getVarientsByItemID(item.item_id)
              .then((variants) => {
                item.variants = variants;
                res.statusCode = 200;
                res.set("Content-Type", "application/json");
                res.json({ success: true, items: item });
              })
              .catch((err) => {
                res.statusCode = 500;
                res.set("Content-Type", "application/json");
                res.json({ success: false, message: err });
              });
          })
          .catch((err) => {
            eres.statusCode = 500;
            res.set("Content-Type", "application/json");
            res.json({ success: false, message: err });
          });
      }
    })
    .catch((err) => {
      res.statusCode = 500;
      res.set("Content-Type", "application/json");
      res.json({ success: false, message: err });
    });
};

const getReplysByFbIDAction = (req, res) => {
  ItemModel.getReplyByFeedbackID(req.params.Fb_id)
    .then((replys) => {
      res.statusCode = 200;
      res.set("Content-Type", "application/json");
      res.json({ success: true, items: replys });
    })
    .catch((err) => {
      res.statusCode = 500;
      res.set("Content-Type", "application/json");
      res.json({ success: false, message: err });
    });
};

const getCartItemsAction = (req, res) => {
  ItemModel.getCartItems(req.params.cart_id)
    .then((cart) => {
      res.statusCode = 200;
      res.set("Content-Type", "application/json");
      res.json({ success: true, items: cart });
    })
    .catch((err) => {
      res.statusCode = 500;
      res.set("Content-Type", "application/json");
      res.json({ success: false, message: err });
    });
};

const getCategoriesAction = (req, res) => {
  ItemModel.getAllCategories()
    .then((categories) => {
      categoriesArr = []
      categories.forEach(element => {
        categoriesArr.push(element.category_name);
      });
      res.statusCode = 200;
      res.set("Content-Type", "application/json");
      res.json({ success: true, items: categoriesArr });
    })
    .catch((err) => {
      res.statusCode = 500;
      res.set("Content-Type", "application/json");
      res.json({ success: false, message: err });
    });
};


const searchItemsInCategoryAction = (req, res) => {
  ItemModel.searchItemsInCategory(req.body.category, req.body.item_name)
    .then((cart) => {
      res.statusCode = 200;
      res.set("Content-Type", "application/json");
      res.json({ success: true, items: cart });
    })
    .catch((err) => {
      res.statusCode = 500;
      res.set("Content-Type", "application/json");
      res.json({ success: false, message: err });
    });
};

exports.getAllItemsAction = getAllItemsAction;
exports.getItemsByCategoryAction = getItemsByCategoryAction;
exports.getItemByIDAction = getItemByIDAction;
exports.getReplysByFbIDAction = getReplysByFbIDAction;
exports.getCartItemsAction = getCartItemsAction;
exports.getCategoriesAction = getCategoriesAction;
exports.searchItemsInCategoryAction = searchItemsInCategoryAction;


const addToCartAction = (req, res) => {
  console.log(req.body);
  ItemModel.addToCart(req.body)
    .then((replys) => {
      res.statusCode = 200;
      res.set("Content-Type", "application/json");
      res.json({ success: true, items: replys });
    })
    .catch((err) => {
      res.statusCode = 500;
      res.set("Content-Type", "application/json");
      res.json({ success: false, message: err });
    });
};

exports.addToCartAction = addToCartAction;
const express = require("express");
const itemRouter = express.Router();
const itemController = require("../controllers/ItemController");

/* GET items listing. */
itemRouter.route("/")
   .get(itemController.getAllItemsAction)
   .post(itemController.searchItemsInCategoryAction);

itemRouter.route("/categories")
   .get(itemController.getCategoriesAction)

itemRouter.route("/search/:category")
  .get(itemController.getItemsByCategoryAction);

itemRouter.route("/specificitem/:Item_id")
  .get(itemController.getItemByIDAction)

itemRouter.route("/specificitem/replys/:Fb_id")
  .get(itemController.getItemByIDAction);

itemRouter.route("/specificitem/addtocart")
  .post(itemController.addToCartAction);

module.exports = itemRouter;

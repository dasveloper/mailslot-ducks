var product_controller = require("../controllers/productController");

module.exports = app => {
  app.post("/product/create", product_controller.create_product);
};

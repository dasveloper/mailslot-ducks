var product_controller = require("../controllers/productController");

module.exports = app => {
  app.post("/product/create", product_controller.create_product);
  app.post("/product/edit", product_controller.edit_product);
  app.get("/product/get", product_controller.get_product);
  app.post("/product/subscribe", product_controller.subscribe_product);
  app.post("/product/delete", product_controller.delete_product);

};

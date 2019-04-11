const mongoose = require("mongoose");
const User = mongoose.model("User");
const Product = mongoose.model("Product");
const validate = require("../helpers/validation");
const imageHelper = require("../helpers/imageHelper");

exports.create_product = async function(req, res) {
    const {
      name,
      title,
      description,
    } = req.body;
    const cover = req.files.cover;
    if (cover.mimetype != "image/jpeg" && cover.mimetype != "image/png") {
        return res.status(401).json({
          success: false,
          message: "wrong file type"
        });
      } else if (cover.size > 1000000 || cover.truncated) {
        return res.status(401).json({
          success: false,
          message: "file too big"
        });
      }
      const coverKey = `${`test`}/test.png`;
      let result = await imageHelper.saveImage(cover, coverKey);
      if (!result) {
        return res.status(401).json({
          success: false,
          message: "image upload fail"
        });
      }
    User.findById(req.user.id, (err, user) => {
      if (err) throw new Error(err);
      

      var newProduct = {
        name,
        title,
        description,
        cover: coverKey,
        creator: req.user._id
      };
  
      // we create our new post in our database
      Product.create(newProduct, (err, product) => {
        if (err) {
          res.redirect("/");
          throw new Error(err);
        }
  console.log(user);
        // we insert our newpost in our posts field corresponding to the user we found in our database call
        user.products.push(product.id);
        // we save our user with our new data (our new post).
        user.save(err => {
          return res.status(200).json({
            success: true,
            message: product.id
          });
        });
      });
    });
  };
  
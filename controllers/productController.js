const mongoose = require("mongoose");
const User = mongoose.model("User");
const Product = mongoose.model("Product");
const Subscription = mongoose.model("Subscription");
const keys = require("../config/keys.js");
const shortid = require('shortid');

const validate = require("../helpers/validation");
const imageHelper = require("../helpers/imageHelper");
const nodemailer = require("nodemailer");

var sgTransport = require("nodemailer-sendgrid-transport");
const crypto = require("crypto");

exports.create_product = async function(req, res) {
  const { name, title, description } = req.body;
  const { cover, productFile } = req.files;
  if (!validate(name, "string")) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid product name"
    });
  }
  if (!validate(title, "string")) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid product title"
    });
  }
  if (!validate(description, "description")) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid product description"
    });
  }
  if (!productFile) {
    return res.status(401).json({
      success: false,
      message: "Please provide a product file"
    });
  }
  if (productFile.mimetype != "application/zip") {
    return res.status(401).json({
      success: false,
      message: "Product file must be of type .zip"
    });
  }
  if (productFile.size > 10000000 || productFile.truncated) {
    return res.status(401).json({
      success: false,

      message: "Maximum product file size is 10MB"
    });
  }
  if (!cover) {
    return res.status(401).json({
      success: false,
      message: "Please provide a cover image"
    });
  }
  if (cover.mimetype != "image/jpeg" && cover.mimetype != "image/png") {
    return res.status(401).json({
      success: false,
      message: "Cover photo must be of type .png or .jpg"
    });
  }
  if (cover.size > 5000000 || cover.truncated) {
    return res.status(401).json({
      success: false,
      message: "Maximum cover photo size is 5MB"
    });
  }

  const coverKey = `${`test`}/test.png`;
  let savedCover = await imageHelper.saveObject(cover, coverKey);
  if (!savedCover) {
    return res.status(401).json({
      success: false,
      message: "Image failed to upload, please try again"
    });
  }
  const productKey = `${`product`}/product.zip`;
  let savedProduct = await imageHelper.saveObject(productFile, productKey);
  if (!savedProduct) {
    return res.status(401).json({
      success: false,
      message: "Product file failed to upload, please try again"
    });
  }

  User.findById(req.user.id, (err, user) => {
    if (err) throw new Error(err);

    var newProduct = {
      name,
      title,
      description,
      cover: coverKey,
      product: productKey,

      creator: req.user._id
    };

    // we create our new post in our database
    Product.create(newProduct, (err, product) => {
      if (err) {
        res.redirect("/");
        throw new Error(err);
      }
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

exports.edit_product = async function(req, res) {
  const { productId, name, title, description } = req.body;
  const { cover, productFile } = req.files || {};

  let editedProduct = {};
  if (!validate(productId, "string")) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong, please try again"
    });
  }
  if (name) {
    if (!validate(name, "string")) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid product name"
      });
    }
    editedProduct.name = name;
  }
  if (title) {
    if (!validate(title, "string")) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid product title"
      });
    }
    editedProduct.title = title;
  }
  if (description) {
    if (!validate(description, "description")) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid product description"
      });
    }
    editedProduct.description = description;
  }
  if (productFile) {
    if (productFile.mimetype != "application/zip") {
      return res.status(401).json({
        success: false,
        message: "Product file must be of type .zip"
      });
    } else if (productFile.size > 10000000 || productFile.truncated) {
      return res.status(401).json({
        success: false,

        message: "Maximum product file size is 10MB"
      });
    }
  }

  if (cover) {
    if (cover.mimetype != "image/jpeg" && cover.mimetype != "image/png") {
      return res.status(401).json({
        success: false,
        message: "Cover photo must be of type .png or .jpg"
      });
    } else if (cover.size > 5000000 || cover.truncated) {
      return res.status(401).json({
        success: false,
        message: "Maximum cover photo size is 5MB"
      });
    }
  }

  if (cover) {
    const coverKey = `${`test`}/${shortid.generate()}.png`;
    let savedCover = await imageHelper.saveObject(cover, coverKey);
    console.log(cover)
    if (!savedCover) {
      return res.status(401).json({
        success: false,
        message: "Image failed to upload, please try again"
      });
    }
    console.log("ASDSD")
    editedProduct.cover = coverKey;
  }
  if (productFile) {
    const productKey = `${`product`}/${shortid.generate()}.zip`;
    let savedProduct = await imageHelper.saveObject(productFile, productKey);
    if (!savedProduct) {
      return res.status(401).json({
        success: false,
        message: "Product file failed to upload, please try again"
      });
    }
    editedProduct.product = productKey;
  }

  // we create our new post in our database
  Product.findOneAndUpdate(productId, editedProduct, (err, product) => {
    if (err) {
      res.redirect("/");
      throw new Error(err);
    }
  
    // we save our user with our new data (our new post).
      return res.status(200).json({
        success: true,
        message: product.id
      });
  });
};

exports.get_product = async function(req, res) {
  const { company, product } = req.query;
  User.findOne({ companyName: company })
    .populate({
      path: "products",
      model: "Product",
      match: { name: product }
    })
    .exec(function(err, results) {
      if (err) {
        res.redirect("/");
        throw new Error(err);
      }
      res.send(results);
    });
};
exports.delete_product = async function(req, res) {
  const { productId } = req.body;
  Product.findByIdAndDelete(productId, err => {
    if (err) throw new Error(err);
    res.send(true);
  });
};

exports.subscribe_product = async function(req, res) {
  const { email, productId } = req.body;

  Product.findById(productId, (err, product) => {
    if (err) throw new Error(err);

    var newSubscriber = {
      email,
      product: productId
    };
    Subscription.create(newSubscriber, (err, subscriber) => {
      if (err) {
        res.redirect("/");
        throw new Error(err);
      }
      // we insert our newpost in our posts field corresponding to the user we found in our database call
      product.subscribers.push(subscriber._id);
      // we save our user with our new data (our new post).
      product.save(err => {
        try {
          const dowloadUrl = `https://s3.amazonaws.com/mailslot/${
            product.product
          }`;
          sendProductEmail(email, dowloadUrl);
        } catch (err) {
          if (err) {
            throw new Error(err);
          }
        }
        res.send(subscriber);
      });
    });
  });
};

sendProductEmail = (email, downloadUrl) => {
  return new Promise(function(resolve, reject) {
    var options = {
      auth: {
        api_key: keys.sendGridAPI
      }
    };
    var client = nodemailer.createTransport(sgTransport(options));

    var mailOptions = {
      to: email,
      from: "passwordreset@demo.com",
      subject: "Node.js Password Reset",
      text:
        "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
        downloadUrl +
        "\n\n" +
        "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
        "If you did not request this, please ignore this email and your password will remain unchanged.\n"
    };

    client.sendMail(mailOptions, function(err, info) {
      if (err) {
        reject(err);
      }
      resolve(info);
    });
  });
};

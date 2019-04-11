const passport = require("passport");
const nodemailer = require("nodemailer");
const async = require("async");
const crypto = require("crypto");
const keys = require("../config/keys.js");
const mongoose = require("mongoose");
var sgTransport = require("nodemailer-sendgrid-transport");
const validate = require("../helpers/validation");
const imageHelper = require("../helpers/imageHelper");


const User = mongoose.model("User");

exports.register_local = function(req, res, next) {
  const {registerEmail, registerPassword, registerConfirmPassword} = req.body;
  if (!validate(registerEmail, "email")) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address"
    });
  }

  if (!validate(registerPassword, "string")) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid password"
    });
  }
  if (!validate(registerConfirmPassword, "string")) {
    return res.status(400).json({
      success: false,
      message: "Please confirm your password"
    });
  }
  if (registerPassword !== registerConfirmPassword) {
    return res.status(400).json({
      success: false,
      message: "Your passwords do not match"
    });
  }
  passport.authenticate("local-signup", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (user) {
      req.login(user, err => {
        if (err) {
          return next(err);
        }
        return res.send(user);
      });
    } else {
      return res.status(400).json({
        success: false,
        message: info
      });
    }
  })(req, res, next);
};

exports.login_local = function(req, res, next) {
  const {loginEmail, loginPassword} = req.body;
  if (!validate(loginEmail, "email")) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid email address"
    });
  }

  if (!validate(loginPassword, "string")) {
    return res.status(400).json({
      success: false,
      message: "Please provide a valid password"
    });
  }
  passport.authenticate("local-login", (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (user) {
      req.login(user, err => {
        if (err) {
          return next(err);
        }
        return res.send(user);
      });
    } else {
      return res.status(400).json({
        success: false,
        message: info
      });
    }
  })(req, res, next);
};

exports.forgot_password = function(req, res, next) {
  async.waterfall(
    [
      function(done) {
        crypto.randomBytes(20, function(err, buf) {
          var token = buf.toString("hex");
          done(err, token);
        });
      },
      function(token, done) {
        User.findOne({ email: req.body.forgotEmail }, function(err, user) {
          if (!user) {
            // req.flash('error', 'No account with that email address exists.');
            return res.status(200).json({
              success: true,
              message: "No account with that email address exists."
            });
          }

          user.resetPasswordToken = token;
          user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

          user.save(function(err) {
            done(err, token, user);
          });
        });
      },
      function(token, user, done) {
        var options = {
          auth: {
            api_key: keys.sendGridAPI
          }
        };
        var client = nodemailer.createTransport(sgTransport(options));

        var mailOptions = {
          to: user.email,
          from: "passwordreset@demo.com",
          subject: "Node.js Password Reset",
          text:
            "You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n" +
            "Please click on the following link, or paste this into your browser to complete the process:\n\n" +
            "http://" +
            req.headers.host +
            "/reset/" +
            token +
            "\n\n" +
            "If you did not request this, please ignore this email and your password will remain unchanged.\n"
        };
        client.sendMail(mailOptions, function(err, info) {
          return res.status(200).json({
            success: true,
            message:
              "An e-mail has been sent to " +
              user.email +
              " with further instructions."
          });
          done(err, 'done');
          //req.flash('info', 'An e-mail has been sent to ' + user.email + ' with further instructions.');
        });
      }
    ],
    function(err) {
      if (err) return next(err);
      return res.status(200).json({
        success: false,
        message: err
      });
    }
  );
};
exports.update_profile = async function(req, res) {
  const { companyName, brandColor } = req.body;
  let file = req.files.logo;

  if (file.mimetype != "image/jpeg" && file.mimetype != "image/png") {
    return res.status(401).json({
      success: false,
      message: "wrong file type"
    });
  } else if (file.size > 1000000 || file.truncated) {
    return res.status(401).json({
      success: false,
      message: "file too big"
    });
  }


  const logo = `${req.user.id}/logo.png`;
  var companyData = {
    companyName,
    brandColor,
    logo
  };
  let result = await imageHelper.saveImage(file, logo);
  if (!result) {
    return res.status(401).json({
      success: false,
      message: "image upload fail"
    });
  }
  User.findOneAndUpdate(req.user.id, companyData, function(err, user) {
    if (err) throw new Error(err);
    return res.status(200).json({
      success: true,
      message: user
    });
  });
};

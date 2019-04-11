const passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var bcrypt = require("bcrypt-nodejs");

const keys = require("../config/keys.js");
const mongoose = require("mongoose");
const User = mongoose.model("User");

//Put user in token
passport.serializeUser((user, done) => {
  done(null, user._id);
});

//Get user from token
passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});
const generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};
const validPassword = function(password, passwordAttempt) {
  return bcrypt.compareSync(password, passwordAttempt);
};

passport.use(
  "local-signup",
  new LocalStrategy(
    {
      usernameField: "registerEmail",
      passwordField: "registerPassword",
      passReqToCallback: true,
      proxy: true //To allow https from Heroku
    },
    async (req, email, password, done) => {
        const {registerFirstName, registerLastName} = req.body;
        User.findOne({ email: email } ).exec()
          .then(user => {
            if (!!user) {
              return done(null, false, "That email is already in use.");
            }

            User.create({
              firstName: registerFirstName,
              lastName: registerLastName,
              email,
              password: generateHash(password)
            })
              .then(newUser => {
                return done(null, newUser);
              })
              .catch(err => {
                throw err;
              });
          })
          .catch(err => {
            return done(err);
          });
    }
  )
);
passport.use(
  "local-login",
  new LocalStrategy(
    {
      usernameField: "loginEmail",
      passwordField: "loginPassword",
      passReqToCallback: true,
      proxy: true //To allow https from Heroku
    },
    function(req, email, password, done) {
      User.findOne({ email: email }).exec()
        .then(user => {
          if (!user) {
            return done(null, false, "Email or password is incorrect");
          }

          if (!validPassword(password, user.password))
          return done(null, false, "Email or password is incorrect");

          return done(null, user);
        })
        .catch(err => {
          return done(err);
        });
    }
  )
);

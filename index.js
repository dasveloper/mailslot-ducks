
var cors = require("cors");
var bodyParser = require("body-parser");
const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const fileUpload = require("express-fileupload");
const aws = require("aws-sdk");
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./models/Product');
require('./models/Subscription');

const accountRoutes = require('./routes/accountRoutes');
const productRoutes = require('./routes/productRoutes');

require('./services/passport');

mongoose.connect(keys.mongoUri);

const app = express();
app.use(fileUpload());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [keys.cookieKey]
  })
)

app.use(passport.initialize());
app.use(passport.session());
productRoutes(app);
accountRoutes(app);


if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}
aws.config.update({
  region: "us-east-1",
  accessKeyId: keys.awsAccessKey,
  secretAccessKey: keys.awsSecretKey
});
const PORT = process.env.PORT || 5000;
app.listen(PORT);

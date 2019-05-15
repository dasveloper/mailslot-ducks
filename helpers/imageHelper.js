var path = require("path");
const aws = require("aws-sdk");
const keys = require("../config/keys.js");
var request = require("request");
var mime = require('mime-types')

//Returns true if text record with key/value match is found
module.exports.saveObject = function(file, key) {
  const folder = "foo" + "/";

  const params = {
    Bucket: keys.awsBucket,
    Key: key,
    ACL: "public-read",
    Body: file.data,
    ContentType: file.mimetype
  };
  return new Promise(function(resolve, reject) {

  var s3 = new aws.S3().putObject(params, function(err, data) {
    if (err) {
      reject(false);
    } else {
      resolve(data);

    }
  });

  });
};

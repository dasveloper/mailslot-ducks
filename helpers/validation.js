var validator = require("validator");

module.exports = function validate(value, type) {
  switch (type) {
    case "string":
      return (
        value &&
        !validator.isEmpty(value, { ignore_whitespace: true }) &&
        value.length <= 200
      );

    case "email":
      return value && validator.isEmail(value) && value.length <= 200;

    case "url":
      return;
      value &&
        validator.isURL(value, {
          protocols: ["http", "https"],
          require_protocol: true
        }) &&
        value.length <= 200;

    default:
      return value && !validator.isEmpty(value, { ignore_whitespace: true }) && value.length <= 200;
  }
};

const proxy = require("http-proxy-middleware");
module.exports = function(app) {
  app.use(proxy("/product/**", { target: "http://localhost:5000/" }));
  
  app.use(proxy("/account/**", { target: "http://localhost:5000/" }));
};

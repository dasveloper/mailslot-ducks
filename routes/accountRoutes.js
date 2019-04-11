const passport = require("passport");
var account_controller = require("../controllers/accountController");

module.exports = app => {

  //Signup with local auth (email/password)
  app.post("/account/register", account_controller.register_local);

  //Login with local auth (email/password)
  app.post("/account/login", account_controller.login_local);


  //Forgot password
  app.post("/account/forgotPassword", account_controller.forgot_password);

  app.get("/account/current_user", (req, res) => {
    res.send(req.user);
  });
  //Logout User
  app.get("/account/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });
  app.post("/account/updateProfile", account_controller.update_profile);

};

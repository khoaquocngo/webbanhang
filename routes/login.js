const { Router } = require("express");
const asyncHandler = require("express-async-handler");
const User = require("../services/user");

const router = new Router();

router.get("/", function getLogin(req, res) {
  if(req.currentUser)
  {
    res.redirect("/");
  }
    res.render("login");
  });
  router.post("/", asyncHandler(async function (req, res){
    const user = await User.findUser(req.body.username);
    if (!user || !User.verifyPassword(req.body.password, user.Password)) {
      
      return res.render("login");
    }
    if( user.Block === true)
    {
      return res.render("login");
    }
    req.session.userId = user.id;
    res.redirect("/");


  }));
  

  module.exports = router;
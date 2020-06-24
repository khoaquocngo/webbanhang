const { Router } = require("express");
const asyncHandler = require("express-async-handler");
const User = require("../services/user");
const requireLoggedln = require("../middlewares/requireLoggedln");

const router = new Router();
router.use(requireLoggedln);

router.get("/", function getLogin(req, res) {
    res.render("ChangePassword");
  });
  router.post("/", asyncHandler(async function (req, res){
    var warning;
    if(!User.verifyPassword(req.body.password1, req.currentUser.Password) )
      {
        warning = 'Mật khẩu nhập vào không chính xác';
        res.render("ChangePassword",{warning});
      }
    if(req.body.password2 != req.body.password3)
    {
        warning = 'Mật khẩu mới và xác minh mật khẩu không giống nhau';
        res.render("ChangePassword",{warning}); 
    }
    const user = await User.findUserById(req.currentUser.id);
    if(user || user.id === req.currentUser.id)
    {
      const Password = await User.hashPassword(req.body.password2);
      await user.ChangePassword(Password);
      
    }
    res.redirect("/logout");  

      
  }));
  module.exports = router;
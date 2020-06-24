const { Router } = require("express");
const asyncHandler = require("express-async-handler");
const User = require("../services/user");
const multer  = require('multer');
const upload = multer({ dest: 'public/uploads/' });
const requireLoggedln = require("../middlewares/requireLoggedln");
const router = new Router();
router.use(requireLoggedln);

router.get("/", function getLogin(req, res) {
    res.render("profile");
  });
  router.post("/", upload.single('avatar'),
  asyncHandler(async function (req, res){
  var Avatar;
    if(req.file)
    {
      Avatar = req.file.path.split("\\").slice(1).join("\\").toString();
    }
    else
    {
      Avatar = req.currentUser.Avatar;
    }
  const Fullname = req.body.fullname;
  const Email = req.body.email;
  const Address = req.body.address;
  const Phone = req.body.phone;
  const user = await User.findUserById(req.currentUser.id);
  if(user || user.id === req.currentUser.id)
  {
    await user.EditProfile(Fullname,Avatar,Email,Address,Phone);
    
  }
  res.redirect("/profile");  
  }));

  module.exports = router;
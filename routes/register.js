const { Router } = require("express");
const User = require("../services/user");
const asyncHandler = require("express-async-handler");
const multer  = require('multer');
const upload = multer({ dest: 'public/uploads/' });

const router = new Router();

router.get("/", function (req, res) {
  if(req.currentUser)
  {
    res.redirect("/");
  }
    res.render("register");
  });
router.post("/", upload.single('avatar'),
 asyncHandler(async function (req, res){
  const Username =  req.body.username;
  const Password = await User.hashPassword(req.body.password);
  const Fullname = req.body.fullname;
  const Email = req.body.email;
  const Address = req.body.address;
  const Phone = req.body.phone;
  const Decentralize = true;
  const Block = false;
  const Avatar = req.file.path.split("\\").slice(1).join("\\").toString();
  await User.AddAccount(Username,Password,Fullname,Avatar,Email,Address,Phone,Decentralize,Block);
  res.redirect("/");
}));


  module.exports = router;
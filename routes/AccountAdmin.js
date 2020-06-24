const { Router } = require("express");
const asyncHandler = require("express-async-handler");
const requireLoggedln = require("../middlewares/requireLoggedln");
const requrieBOSS = require("../middlewares/requrieBOSS");
const User = require("../services/user");

const router = new Router();
router.use(requireLoggedln);
router.use(requrieBOSS);

router.get("/", asyncHandler(async function (req, res) {
  const user = await User.findAccoutAdmin();
  res.render("AccountAdmin", { user });
}));
router.post("/", asyncHandler(async function (req, res) {
  const Username = req.body.username;
  const Password = await User.hashPassword(req.body.password);
  const Decentralize = false;
  const Block = false;
  await User.create({ Username, Password, Decentralize,Block });
  res.redirect("AccountAdmin");
}));
router.get("/:id/block", asyncHandler(async function (req, res) {
  const {id} = req.params;
  const user = await User.findUserById(id);
  if(!user)
  {
    res.redirect("/AccountAdmin");
  }
  if(user.Username != "admin")
  {
    const Block = true;
    await user.BlockorunBlock(Block);
  }
  res.redirect("/AccountAdmin");

}));
router.get("/:id/unblock", asyncHandler(async function (req, res) {
  const {id} = req.params;
  const user = await User.findUserById(id);
  if(!user)
  {
    res.redirect("/AccountAdmin");
  }
  if(user.Username != "admin")
  {
    const Block = false;
    await user.BlockorunBlock(Block);
  }
  res.redirect("/AccountAdmin");

}));


module.exports = router;
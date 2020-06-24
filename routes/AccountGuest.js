const { Router } = require("express");
const asyncHandler = require("express-async-handler");
const User = require("../services/user");
const requireLoggedln = require("../middlewares/requireLoggedln");
const requireAdmin = require("../middlewares/requireAdmin");
const router = new Router();

router.use(requireLoggedln);
router.use(requireAdmin);

router.get("/", asyncHandler(async function (req, res) {
  var user = await User.findAccoutGuest();
  if (!user) {
    user = null;
  }
  res.render("AccountGuest", { user });

}));
router.get("/:id/block", asyncHandler(async function (req, res) {
  const {id} = req.params;
  const user = await User.findUserById(id);
  if(!user)
  {
    res.redirect("/AccountGuest");
  }
    const Block = true;
    await user.BlockorunBlock(Block);
  res.redirect("/AccountGuest");

}));
router.get("/:id/unblock", asyncHandler(async function (req, res) {
  const {id} = req.params;
  const user = await User.findUserById(id);
  if(!user)
  {
    res.redirect("/AccountGuest");
  }
    const Block = false;
    await user.BlockorunBlock(Block);
    res.redirect("/AccountGuest");

}));
module.exports = router;
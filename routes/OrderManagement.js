const { Router } = require("express");
const Order = require("../services/order");
const asyncHandler = require("express-async-handler");
const requireLoggedln = require("../middlewares/requireLoggedln");
const requireAdmin = require("../middlewares/requireAdmin");

const router = new Router();
router.use(requireLoggedln);
router.use(requireAdmin);

router.get("/", asyncHandler(async function(req,res){
    const order = await Order.findAllList();
    res.render("OrderManagement",{order});


}));

  module.exports = router;
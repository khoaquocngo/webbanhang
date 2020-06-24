const { Router } = require("express");
const Order = require("../services/order");
const asyncHandler = require("express-async-handler");
const requireLoggedln = require("../middlewares/requireLoggedln");
const router = new Router();
router.use(requireLoggedln);
router.get("/:id", asyncHandler(async function(req,res){
    const { id } = req.params;
    var order = await Order.findbyId(id);
    if(!order)
    {
        order = null;
    
    }
    console.log(order);
    res.render("OrderDetail",{order});
    

}));

  module.exports = router;
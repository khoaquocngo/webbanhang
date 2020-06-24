const { Router } = require("express");
const Order = require("../services/order");
const Cart = require("../services/cart")
const crypto = require("crypto");
const asyncHandler = require("express-async-handler");
const requireLoggedln = require("../middlewares/requireLoggedln");
const router = new Router();
router.use(requireLoggedln);


router.post("/",
 asyncHandler(async function (req, res){
   if(!req.body.number)
   {
     res.redirect("/");
   }
   const code = crypto.randomBytes(4).toString("hex").toUpperCase();
   const Fullname = req.body.fullname;
   const Email = req.body.email;
   const Address = req.body.address;
   const Phone = req.body.phone;
   const userId = req.currentUser.id;
   const productId = req.body.productId;
   const number = req.body.number;
   for(var i = 0; i< productId.length;i++)
   {
     await Order.AddOrders(code,Fullname,Email,Address,Phone,number[i],userId,productId[i]);
     await Cart.DeleteProductCart(userId,productId[i]);
   }
   res.render("reply");
  
}));


  module.exports = router;
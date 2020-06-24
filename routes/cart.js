const { Router } = require("express");
const asyncHandler = require("express-async-handler");
const  Cart = require("../services/cart");
const requireLoggedln = require("../middlewares/requireLoggedln");

const router = new Router();

router.use(requireLoggedln);


router.get("/", asyncHandler(async function(req, res) {
  var carts =  await Cart.findAllCarts(req.currentUser.id);
  if(carts)
  {
    res.render("cart",{carts});
  }
  else
  {
    carts = null;
    res.render("cart",{carts});
  }
  }));

router.get("/:productId/add", asyncHandler(async function(req, res) {
    const { productId } = req.params;
    const cart = await Cart.findbyCart(req.currentUser.id,productId);
     if(cart)
     {
       const number = cart.number + 1;
       await cart.UpdateNumber(number);
     }
    else
    {
      await Cart.AddCart(req.currentUser.id,productId);
    }
   
    res.redirect("/cart");

  }));
router.post("/", asyncHandler(async function(req, res) {
const number = req.body.number;
const productId = req.body.productId;
for(var i = 0; i< productId.length;i++)
{
  if(number[i] == 0  )
  {
    await Cart.DeleteProductCart(req.currentUser.id,productId[i]);

  }
  else
 { const cart = await Cart.findbyCart(req.currentUser.id,productId[i]);
  await cart.UpdateNumber(number[i]);
 }
}
res.redirect("/cart");

}));

router.get("/:productId/delete", asyncHandler(async function(req, res) {
  const { productId } = req.params;
  await Cart.DeleteProductCart(req.currentUser.id,productId);
  res.redirect("/cart");


}));
  module.exports = router;
const { Router } = require("express");
const Product = require("../services/product");
const Cart = require("../services/cart");
const Order = require("../services/order");
const asyncHandler = require("express-async-handler");
const requireLoggedln = require("../middlewares/requireLoggedln");
const requireAdmin = require("../middlewares/requireAdmin");
const multer  = require('multer');
const upload = multer({ dest: 'public/uploads/' });

const router = new Router();

router.use(requireLoggedln);
router.use(requireAdmin);

router.get("/", asyncHandler(async function(req,res){
    var product = await Product.findAll();
    if(!product)
    {
        product = null;

    }
    res.render("ProductManagement",{product});

}));
router.get("/search",asyncHandler ( async function (req,res){
    const {PName} = req.query;
    const product = await Product.FindbyName(PName);
     res.render("ProductManagement",{product});

}));



router.post("/", upload.single('ProductImage'),
asyncHandler(async function (req, res){
var ProductImage;
const ProductName = req.body.ProductName;
const Price = req.body.Price;
const Description = req.body.Description;
const id = Number(req.body.idproduct);
console.log(req.body.idproduct);
  if(req.file)
  {
    ProductImage = req.file.path.split("\\").slice(1).join("\\").toString();
  }
  else
  {
      const p = await Product.findbyid(req.body.idproduct);
      ProductImage = p.ProductImage;
  }
  if(req.body.update !=null)
  {
    const p = await Product.findbyid(req.body.idproduct);
    await p.updateProduct(ProductName,Price,Description,ProductImage);
  }   

if(req.body.add != null)
{
  await Product.AddProduct(ProductName,Price,Description,ProductImage);
}
res.redirect("/ProductManagement");


}));



router.get("/:id/delete",asyncHandler ( async function (req,res){
    const {id} = req.params;
    await Cart.DeleteCart(id);
    await Order.DeleteOrder(id);
    await Product.DeleteProdcut(id);
    res.redirect("/ProductManagement");  
}));

router.get("/update/:id", asyncHandler( async function (req, res) {
    const {id} = req.params;
    const data = await Product.findbyid(id);
    res.json(data);

}));

  module.exports = router;
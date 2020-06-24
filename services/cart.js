const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const User = require("../services/user");
const Product = require("../services/product");
const db = require("./db");

const Model = Sequelize.Model;
class Cart extends Model {
  static async AddCart(userId,productId) {
    return  Cart.create({
      userId,
      productId,
    });
  }
  static async DeleteCart(productId)
  {
    return Cart.destroy({
      where:{
        productId,
      }
    })
  }
  static async findAllCarts(userId){
    return Cart.findAll({
      include: [{
        model: User
    },
    {
       model: Product
    }
  ],
  where:{
    userId

  },

    })
  }
  static async DeleteProductCart(userId,productId)
  {
    return Cart.destroy({
      where:{
        userId,
        productId,

      }
    })


  }

  async UpdateNumber(number)
  {
    this.number = number; 
    this.save();
  }
  static async findbyCart(userId,productId){
    return Cart.findOne({
      where: {
        userId,
        productId,
      }
    })
  }

}
Cart.init(
  {
    // attributes
    number: {
      type: Sequelize.INTEGER,
      defaultValue: 1,
      
    },
  },
  {
    sequelize: db,
    modelName: "cart",
    // options
  }
);
User.hasMany(Cart);
Cart.belongsTo(User);
Product.hasMany(Cart);
Cart.belongsTo(Product);

module.exports =  Cart;

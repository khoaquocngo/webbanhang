const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const User = require("../services/user");
const Product = require("../services/product");
const db = require("./db");

const Model = Sequelize.Model;
class Order extends Model {
  static async DeleteOrder(productId)
  {
    return Order.destroy({
      where:{
        productId,
      }
    })
  }
    static async findbyId(id){
      return Order.findOne({
        include: [
      {
         model: Product
      }
    ],
    where:{
      id,
    },

      });
    }
    static async AddOrders(code,Fullname,Email,Address,Phone,Number,userId,productId)
    {
      return Order.create({
        code,
        Fullname,
        Email,
        Address,
        Phone,
        Number,
        userId,
        productId,
      })
    }
    static async findAllList()
    {
      return Order.findAll({
        include: [{
          model: User
      },
      {
         model: Product
      }
    ],
      })
    }

    static async findAllOrder(userId){
      return Order.findAll({
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

}
Order.init(
  {
    // attributes
    code: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    Fullname:
    {
    type: Sequelize.STRING,
    allowNull: false,
    },
    Email:
    {
    type: Sequelize.STRING,
    allowNull: false,
    },
    Address:
    {
    type: Sequelize.STRING,
    allowNull: false,
    },
    Phone:
    {
    type: Sequelize.STRING,
    allowNull: false,
    },
    Number:
    {
    type: Sequelize.INTEGER,
    allowNull: false,

    }

  },
  {
    sequelize: db,
    modelName: "order",
    // options
  }
);
User.hasMany(Order);
Order.belongsTo(User);
Product.hasMany(Order);
Order.belongsTo(Product);
module.exports =  Order;

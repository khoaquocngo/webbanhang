const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const db = require("./db");
const Op = Sequelize.Op;


const Model = Sequelize.Model;
class Product extends Model {
    static async FindAllProduct() {
        return  Product.findAll({
            limit: 10,
        });
      }
      static async AddProduct(ProductName,Price,Description,ProductImage) {
        return  Product.create({
          ProductName,
          Price,
          Description,
          ProductImage,
        });
      }
    async updateProduct(ProductName,Price,Description,ProductImage)
    {
      this.ProductName = ProductName;
      this.Price = Price;
      this.Description = Description;
      this.ProductImage = ProductImage;
      return this.save();
    }
    static async findbyid(id)
    {
      return Product.findByPk(id);
    }
    static async DeleteProdcut(id)
    {
      return Product.destroy({
        where:{
          id,
        }
      })
    }
    static async FindbyName(pName)
    {
      return Product.findAll({
        where: {
          [Op.or]: [
            {
              ProductName: {
                [Op.like]: `%${pName}%`,
              },
            },
          ]
        },

      })

    }  
  
}
Product.init(
  {
    // attributes
    ProductName: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    Price: {
        type: Sequelize.DOUBLE,
        allowNull: false,
      },
    Description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    ProductImage: {
        type: Sequelize.STRING,
      },
  },
  {
    sequelize: db,
    modelName: "product",
    // options
  }
);


module.exports =  Product;

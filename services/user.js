const bcrypt = require("bcrypt");
const Sequelize = require("sequelize");
const db = require("./db");

const Model = Sequelize.Model;
class User extends Model {
  static verifyPassword(password, hashPassword) {
    return bcrypt.compareSync(password, hashPassword);
  }
  static async findAccoutAdmin()
  {
    return User.findAll({
      where:{
        Decentralize: false,
      },
    })
  }
  static async findAccoutGuest()
  {
    return User.findAll({
      where:{
        Decentralize: true,
      }
    })
  }
  async EditProfile(Fullname,Avatar,Email,Address,Phone)
  {
    this.Fullname = Fullname;
    this.Avatar = Avatar;
    this.Email = Email;
    this.Address = Address;
    this.Phone = Phone;
    return this.save();

  }
  async BlockorunBlock(Block)
  {
    this.Block = Block;
    return this.save();
  }
  async ChangePassword(Password)
  {
    this.Password = Password;
    return this.save();

  }

  static hashPassword(password) {
    return bcrypt.hashSync(password, 10);
  }

  static async findUserById(id) {
    return User.findByPk(id);
  }
  static async AddAccount(Username,Password,Fullname,Avatar,Email,Address,Phone,Decentralize,Block)
  {
    return User.create({
      Username,
      Password,
      Fullname,
      Avatar,
      Email,
      Address,
      Phone,
      Decentralize,
      Block,
    })
  }
  static async findUser(Username) {
    return User.findOne({
      where: {
        Username,
      },
    });
  }
}
User.init(
  {
    // attributes
    Username: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    Password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    Fullname: {
      type: Sequelize.STRING,
    },
    Avatar:{
        type: Sequelize.TEXT,
    },
    Address:{
        type: Sequelize.STRING,
    },
    Phone:{
        type: Sequelize.STRING,
    },
    Email:{
      type: Sequelize.STRING,
    },
    Decentralize:{
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },
    Block:{
      type: Sequelize.BOOLEAN,
      allowNull: false,
    },

  },
  {
    sequelize: db,
    modelName: "user",
    // options
  }
);


module.exports = User;

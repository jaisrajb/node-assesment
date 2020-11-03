const { DataTypes } = require("sequelize");
const md5 = require("md5");
//creating table for users
module.exports = function (sequelize) {
  return sequelize.define(
    "users",
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      first_name: {
        defaultValue: "first name",
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      last_name: {
        defaultValue: "last name",
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING(100),
        unique: true,
      },
      //saving hashed password
      password: {
        allowNull: false,
        type: DataTypes.STRING(100),
        set: (value) => {
          console.log("-md5 checking result");
          console.log(md5(value));
          console.log(this.setDataValue);
          sequelize.setDataValue("password", md5(value));
        },
      },
    },
    { timestamps: false }
  );
};

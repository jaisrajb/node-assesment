const { DataTypes } = require("sequelize");
//creating table structure for blogs
module.exports = function (sequelize) {
  return sequelize.define(
    "blogs",
    {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER,
      },
      blog_name: {
        defaultValue: "name",
        allowNull: false,
        type: DataTypes.STRING(100),
      },
      language: {
        defaultValue: "language",
        allowNull: false,
        type: DataTypes.STRING(100),
      },
    },
    { timestamps: false }
  );
};

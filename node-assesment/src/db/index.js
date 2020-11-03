const { Sequelize, DataTypes } = require("sequelize");
require('dotenv').config();
 

const sequelize = new Sequelize({
  dialect: "postgres",
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USERNAME,
  password: process.env.PASSWORD,
  database: "blog-app",
  sync: true,
});

const blogs = require("./models/blogs")(sequelize);
const users = require("./models/users")(sequelize);

const init = async function () {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
  } catch (error) {
    console.log("db > init > ", error);
  }
};

module.exports = {
  init,
  users,
  blogs,
  sequelize,
};

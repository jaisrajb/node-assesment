const { sequelize } = require("../db/index");
const md5 = require("md5");

function Init(app) {
  //getting user
  app.get("/user", async function (request, response) {
    const users = await sequelize.models.users.findAll({});
    response.status(200).send(users);
  });

  app.get("/user/:id", async function (request, response) {
    const { id } = request.params;
    const user = await sequelize.models.users.findOne({ id });
    response.send({ user });
  });
//deleting user with id passed in URL(postman)
  app.delete("/user/:id", async function (request, response) {
    const { id } = request.params;
    const user = await sequelize.models.users.findOne({ id });
    const dest = await user.destroy();
    response.send({ dest });
  });
// adding an user
  app.post("/user", async function (request, response) {
    const { body } = request;
    const { first_name, last_name, email, password } = body;

    const createdUser = await sequelize.models.users.create({
      first_name,
      last_name,
      email,
      password: md5(password),
    });

    const { password: dbPassword, ...sanitizedUser } = JSON.parse(
      JSON.stringify(createdUser)
    );
    response.status(201).send(sanitizedUser);
  });
//updating an user
  app.put("/user/:id", async function (request, response) {
    const { id } = request.params;
    const user = await sequelize.models.users.findOne({ id });

    const { body } = request;
    const { first_name, last_name, email, password } = body;

    user.first_name = first_name ? first_name : user.first_name;
    user.last_name = last_name ? last_name : user.last_name;
    user.email = email ? email : user.email;
  
    await user.save(); //to update values in database

    const { password: dbPassword, ...sanitizedUser } = JSON.parse(
      JSON.stringify(user)
    );

    response.status(200).send(sanitizedUser);
  });
}

module.exports = {
  Init,
};

const crypto = require("crypto");
const db = require("../config/db");

async function getUserByUsername(userName) {
  return await db.Users.findOne({ where: { UserName: userName } });
}

async function getAll() {
  return await db.Users.findAll();
}

async function getUserById(id) {
  return await db.Users.findByPk(id);
}

async function createUser(userData, hashedPassword) {
  const { userName, email, firstName, lastName } = userData;
  const newUser = await db.Users.create({
    Id: crypto.randomUUID(),
    UserName: userName,
    Email: email,
    Password: hashedPassword,
    FirstName: firstName,
    LastName: lastName,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return newUser;
}

async function updateUser(id, userData) {
  const { userName, email, firstName, lastName } = userData;
  await db.Users.update(
    {
      UserName: userName,
      Email: email,
      FirstName: firstName,
      LastName: lastName,
      updatedAt: new Date(),
    },
    {
      where: {
        Id: id,
      },
    }
  );
  return { id, userName, email, firstName, lastName };
}

async function deleteUser(id) {
  await db.Users.destroy({
    where: { Id: id },
  });
}

module.exports = {
  getUserByUsername,
  getAll,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};

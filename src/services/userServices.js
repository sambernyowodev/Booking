const db = require("../config/db");

async function getUserByUsername(username) {
  return await db.Users.findOne({ where: { UserName: username } });
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
    userName,
    email,
    hashedPassword,
    firstName,
    lastName,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return newUser;
}

async function updateUser(id, userData) {
  const { userName, email, firstName, lastName } = userData;
  await db.Users.update(
    { userName, email, firstName, lastName, updatedAt: new Date() },
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

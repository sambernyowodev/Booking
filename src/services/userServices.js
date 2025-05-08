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

async function createUser(UserName, Email, Password, FirstName, LastName) {
    const newUsers = await db.Users.create({ UserName, Email, Password, FirstName, LastName, createdAt: new Date(), updatedAt: new Date() });
  return newUsers;
}

async function updateUser(id, UserName, Email, FirstName, LastName) {
    await db.Users.update(
      { UserName, Email, FirstName, LastName, updatedAt: new Date() },
      {
        where: {
          Id: id,
        },
      }
    );
    return { Id, UserName, Email, FirstName, LastName };
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

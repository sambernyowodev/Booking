const crypto = require("crypto");
const db = require("../config/db");
const userDTO = require("../dto/userDto");
const userRoleDTO = require("../dto/userRoleDto");

async function getUserByUsername(userName) {
  return await db.Users.findOne({ where: { UserName: userName } });
}

async function getAll() {
  const users = await db.Users.findAll({ include: db.UserRoles });
  // Create DTO instances for each user
  return users.map(
    (user) =>
      new userDTO(
        user.Id,
        user.UserName,
        user.Email,
        user.FirstName,
        user.LastName,
        {
          id: user.UserRole.Id,
          name: user.UserRole.Name,
          description: user.UserRole.Description,
        }
      )
  );
}

async function getUserById(id) {
  const user = await db.Users.findByPk(id, { include: db.UserRoles });
  // Create a DTO instance
  return new userDTO(
    user.Id,
    user.UserName,
    user.Email,
    user.FirstName,
    user.LastName,
    {
      id: user.UserRole.Id,
      name: user.UserRole.Name,
      description: user.UserRole.Description,
    }
  );
}

async function createUser(userData, hashedPassword) {
  const { userName, email, firstName, lastName, userRoleId } = userData;
  const newUser = await db.Users.create({
    Id: crypto.randomUUID(),
    UserName: userName,
    Email: email,
    Password: hashedPassword,
    FirstName: firstName,
    LastName: lastName,
    UserRoleId: userRoleId,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // Create a DTO instance
  return new userDTO(
    newUser.Id,
    newUser.UserName,
    newUser.Email,
    newUser.FirstName,
    newUser.LastName
  );
}

async function updateUser(id, userData) {
  const { userName, email, firstName, lastName, userRoleId } = userData;
  await db.Users.update(
    {
      UserName: userName,
      Email: email,
      FirstName: firstName,
      LastName: lastName,
      UserRoleId: userRoleId,
      updatedAt: new Date(),
    },
    {
      where: {
        Id: id,
      },
    }
  );

  return getUserById(id);
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

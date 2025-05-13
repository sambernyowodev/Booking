const db = require("../config/db");
const userRoleDTO = require("../dto/userRoleDto");

async function getAll() {
  const userRoles = await db.UserRoles.findAll();
  // Create DTO instances for each userRole role
  return userRoles.map(
    (userRole) =>
      new userRoleDTO(userRole.Id, userRole.Name, userRole.Description)
  );
}

async function getUserRoleById(id) {
  const userRole = await db.UserRoles.findByPk(id);
  // Create a DTO instance
  return new userRoleDTO(userRole.Id, userRole.Name, userRole.Description);
}

async function createUserRole(userRoleData) {
  const { name, description } = userRoleData;
  const newUserRole = await db.UserRoles.create({
    Id: crypto.randomUUID(),
    Name: name,
    Description: description,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  // Create a DTO instance
  return new userRoleDTO(
    newUserRole.Id,
    newUserRole.Name,
    newUserRole.Description
  );
}

async function updateUserRole(id, userRoleData) {
  const { name, description } = userRoleData;
  await db.UserRoles.update(
    {
      Name: name,
      Description: description,
      updatedAt: new Date(),
    },
    {
      where: {
        Id: id,
      },
    }
  );

  return getUserRoleById(id);
}

async function deleteUserRole(id) {
  await db.UserRoles.destroy({
    where: { Id: id },
  });
}

module.exports = {
  getAll,
  getUserRoleById,
  createUserRole,
  updateUserRole,
  deleteUserRole,
};

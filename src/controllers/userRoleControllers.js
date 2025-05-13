const logger = require("../middleware/logger");
const userRoleService = require("../services/userRoleServices");

async function getAllUserRoles(req, res) {
  try {
    const userRoles = await userRoleService.getAll();

    // Check if users array is empty
    if (userRoles.length === 0) {
      logger.warn("No user roles found");
      return res.status(404).json({ message: "No user roles found" });
    }

    logger.info("Retrieved all user roles", { userRoles });
    res.status(200).json(userRoles);
  } catch (err) {
    logger.error("Failed to retrieve user roles", err);
    res.status(500).json({ error: "Failed to retrieve user roles" });
  }
}

async function getUserRoleById(req, res) {
  try {
    const userRole = await userRoleService.getUserRoleById(req.query.id);
    if (userRole) {
      logger.info("Retrieved user role", { userRole });
      res.status(200).json(userRole);
    } else {
      logger.warn("User role not found", { id: req.query.id });
      res.status(404).json({ message: "User role not found" });
    }
  } catch (err) {
    logger.error("Failed to retrieve user role", err);
    res.status(500).json({ error: "Failed to retrieve user role" });
  }
}

async function createUserRole(req, res) {
  try {
    const userRole = await userRoleService.createUserRole(req.body);
    logger.info("User role created successfully", { userRole });
    res.status(201).json({ data: userRole, message: "User role created successfully" });
  } catch (err) {
    logger.error("Failed to create user role", err);
    res.status(500).json({ error: "Failed to create user role" });
  }
}

async function updateUserRole(req, res) {
  try {
    const updatedUserRole = await userRoleService.updateUserRole(req.query.id, req.body);
    if (updatedUserRole) {
      logger.info("User role updated successfully", { updatedUserRole });
      res
        .status(200)
        .json({ data: updatedUserRole, message: "User role updated successfully" });
    } else {
      logger.warn("User role not found for update", { id: req.query.id });
      res.status(404).json({ message: "User role not found" });
    }
  } catch (err) {
    logger.error("Failed to update user role", err);
    res.status(500).json({ error: "Failed to update user role" });
  }
}

async function deleteUserRole(req, res) {
  try {
    await userRoleService.deleteUserRole(req.query.id);
    logger.info("User role deleted successfully", { id: req.query.id });
    res.status(204).send(); // No content on successful deletion
  } catch (err) {
    logger.error("Failed to delete user role", err);
    res.status(500).json({ error: "Failed to delete user role" });
  }
}

module.exports = {
  getAllUserRoles,
  getUserRoleById,
  createUserRole,
  updateUserRole,
  deleteUserRole,
};

const logger = require("../middleware/logger");
const userService = require("../services/userServices");

async function getAllUsers(req, res) {
  try {
    const users = await userService.getAll();

    // Check if users array is empty
    if (users.length === 0) {
      logger.warn("No users found");
      return res.status(404).json({ message: "No users found" });
    }

    logger.info("Retrieved all users", { users });
    res.status(200).json(users);
  } catch (err) {
    logger.error("Failed to retrieve users", err);
    res.status(500).json({ error: "Failed to retrieve users" });
  }
}

async function getUserById(req, res) {
  try {
    const user = await userService.getUserById(req.query.id);
    if (user) {
      logger.info("Retrieved user", { user });
      res.status(200).json(user);
    } else {
      logger.warn("User not found", { id: req.query.id });
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    logger.error("Failed to retrieve user", err);
    res.status(500).json({ error: "Failed to retrieve user" });
  }
}

async function updateUser(req, res) {
  try {
    const updatedUser = await userService.updateUser(req.query.id, req.body);
    if (updatedUser) {
      logger.info("User updated successfully", { updatedUser });
      res
        .status(200)
        .json({ user: updatedUser, message: "User updated successfully" });
    } else {
      logger.warn("User not found for update", { id: req.query.id });
      res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    logger.error("Failed to update user", err);
    res.status(500).json({ error: "Failed to update user" });
  }
}

async function deleteUser(req, res) {
  try {
    await userService.deleteUser(req.query.id);
    logger.info("User deleted successfully", { id: req.query.id });
    res.status(204).send(); // No content on successful deletion
  } catch (err) {
    logger.error("Failed to delete user", err);
    res.status(500).json({ error: "Failed to delete user" });
  }
}

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
};

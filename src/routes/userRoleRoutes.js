const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authentication");
const {
  getAllUserRoles,
  getUserRoleById,
  createUserRole,
  updateUserRole,
  deleteUserRole,
} = require("../controllers/userRoleControllers");
const {
  createUserRoleSchema,
  updateUserRoleSchema,
} = require("../validation/userRoleValidation");

router.get("/role/getAll", authenticate, getAllUserRoles);
router.get("/role/getById", authenticate, getUserRoleById);
router.post(
  "/role/create",
  authenticate,
  createUserRoleSchema,
  createUserRole
);
router.put(
  "/role/update",
  authenticate,
  updateUserRoleSchema,
  updateUserRole
);
router.delete("/role/delete", authenticate, deleteUserRole);

module.exports = router;

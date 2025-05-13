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

router.get("/getAllUserRoles", authenticate, getAllUserRoles);
router.get("/getUserRoleById", authenticate, getUserRoleById);
router.post(
  "/createUserRole",
  authenticate,
  createUserRoleSchema,
  createUserRole
);
router.put(
  "/updateUserRole",
  authenticate,
  updateUserRoleSchema,
  updateUserRole
);
router.delete("/deleteUserRole", authenticate, deleteUserRole);

module.exports = router;

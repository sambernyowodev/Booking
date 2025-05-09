const express = require("express");
const router = express.Router();
const { authenticate } = require("../middleware/authentication");
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userControllers");
const { updateUserSchema } = require("../validation/userValidation");

router.get("/getAllUsers", authenticate, getAllUsers);
router.get("/getUserById", authenticate, getUserById);
router.put("/updateUser", authenticate, updateUserSchema, updateUser);
router.delete("/deleteUser", authenticate, deleteUser);

module.exports = router;

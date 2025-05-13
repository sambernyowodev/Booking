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

router.get("/user/getAll", authenticate, getAllUsers);
router.get("/user/getById", authenticate, getUserById);
router.put("/user/update", authenticate, updateUserSchema, updateUser);
router.delete("/user/delete", authenticate, deleteUser);

module.exports = router;

const express = require("express");
const router = express.Router();
const { login, signup } = require("../controllers/authControllers");
const { createUserSchema } = require("../validation/userValidation");

router.post("/signup", createUserSchema, signup);
router.post("/login", login);

module.exports = router;

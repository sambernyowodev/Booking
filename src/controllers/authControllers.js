const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const logger = require("../middleware/logger");
const userService = require("../services/userServices");
const JWT_SECRET = process.env.JWT_SECRET;

async function login(req, res) {
  try {
    const { userName, password } = req.body;

    // Find the user by username
    const user = await userService.getUserByUsername(userName);
    if (!user) {
      logger.warn("Invalid username or password", { userName });
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(password, user.Password);
    if (!isPasswordValid) {
      logger.warn("Invalid username or password", { userName });
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user.Id, userName: user.userName },
      JWT_SECRET,
      { expiresIn: "1h" }
    );
    logger.info("User logged in successfully", { userName });
    res.status(200).json({ token, message: "Login successful" });
  } catch (err) {
    logger.error("Error logging in:", err);
    res.status(500).json({ error: "Failed to login" });
  }
}

async function signup(req, res) {
  try {
    const { userName, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if the UserName or email already exists
    const existingUser = await userService.getUserByUsername(userName);
    if (existingUser) {
      logger.warn("UserName already exists", { UserName: userName });
      return res.status(409).json({ message: "Username already exists" });
    }

    const user = await userService.createUser(req.body, hashedPassword);
    logger.info("User created successfully", { userName });
    res.status(201).json({ user, message: "User created successfully" });
  } catch (err) {
    logger.error("Failed to create user", err);
    res.status(500).json({ error: "Failed to create user" });
  }
}

module.exports = {
  login,
  signup,
};

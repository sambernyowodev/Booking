const express = require('express');
const router = express.Router();
const { authenticate } = require('../middleware/authentication');
const { getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userControllers');

router.get('/getAllUsers', authenticate, getAllUsers);
router.get('/getUserById', authenticate, getUserById);
router.put('/updateUser', authenticate,  updateUser);
router.delete('/deleteUser', authenticate, deleteUser);

module.exports = router;
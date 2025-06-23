const express = require('express');
const { registerUser, loginUser, getUserProfile, updateUserProfile } = require('../controllers/auth.controllers');
const { protect } = require('../middlewares/auth.middlewares');
const router = express.Router();

//Auth Routes
router.post("/register",registerUser);
router.post("/login",loginUser);
router.get("/profile",protect,getUserProfile);
router.put("/profile",protect,updateUserProfile);

module.exports = router;
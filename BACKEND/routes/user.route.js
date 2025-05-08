const express = require("express");
const router = express.Router();
const { register, login, updateprofile, logout } = require("../controllers/user.controller");
const { IsAuthenticated } = require("../Middleware/isAuthenticated");

router.post("/register", register);
router.post("/login", login);
router.get("/logout", logout);
// Change POST to PUT for updating profile
router.put("/profile/update", IsAuthenticated, updateprofile);

module.exports = router;

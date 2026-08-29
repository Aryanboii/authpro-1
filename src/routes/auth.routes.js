const express = require("express");
const {register,login,logout} = require("../controllers/auth.controllers");

const {
    authenticate,
} = require("../middlewares/auth.middleware");

const router = express.Router();

router.post("/register",register);
router.post("/login",login);
router.post("/logout", authenticate, logout);

module.exports = router;
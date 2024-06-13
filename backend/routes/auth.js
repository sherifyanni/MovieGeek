const AuthController = require("../controllers/AuthController");
const express = require("express");
const router = express.Router();



router.post("/signup", AuthController.signup);
router.post("/signin", AuthController.signin);

module.exports = router;

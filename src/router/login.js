const express = require("express");
const router = express.Router();
const { login } = require("../controller/login.controller");

router.get("/", login);

module.exports = router;

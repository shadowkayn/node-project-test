// 路由分模块管理，这是其中一个user模块
const express = require("express");
const router = express.Router();
const {
  addUser,
  getUserList,
  updateUser,
  deleteUser,
  getUserById,
} = require("../controller/user.controller.js");
const { authMiddleware } = require("../controller/login.controller");

router.post("/add", addUser);
router.get("/getList", getUserList);
router.put("/edit", updateUser);
router.delete("/delete", deleteUser);
router.get("/getUserById/:id", getUserById);

// 这个接口需要登录才能访问
// router.get("/get/profile", authMiddleware, getProfile);

module.exports = router;

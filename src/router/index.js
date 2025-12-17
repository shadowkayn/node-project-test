// 在主路由文件引入其他路由模块，例如user.js
const userRouter = require("./user.js");
const loginRouter = require("./login.js");
const fileRouter = require("./file.js");

const routerObject = {
    '/user': userRouter,
    '/login': loginRouter,
    '/file': fileRouter
}

module.exports = routerObject;



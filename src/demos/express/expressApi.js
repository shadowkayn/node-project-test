// 路由分模块管理，这是主路由文件
const express = require("express");
const app = express();
app.use(express.json());

// 在主路由文件引入其他路由模块，例如user.js
const userRouter = require("./user.js");
app.use('/users', userRouter);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
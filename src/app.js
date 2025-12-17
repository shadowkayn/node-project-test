const express = require("express");
const cors = require("cors");
const routers = require("./router/index.js");
const path = require("node:path");
const { connectDB } = require("./db/index.js");
const logger = require("./utils/logger");
const helmet = require("helmet");
const rateLimiter = require("express-rate-limit");

const app = express();

// 引入并使用 express.json() 中间件来解析传入的 JSON 请求体，必须在路由之前调用
app.use(express.json());

// 注意：需要在路由前调用数据库连接
connectDB();

// 循环挂载路由
Object.keys(routers).forEach((key) => {
  app.use(key, routers[key]);
});

// 错误处理中间件； 中间件要放在路由后面
app.use((err, req, res, next) => {
  let { statusCode = 500, message } = err;

  // 如果是开发环境，显示堆栈跟踪
  if (process.env.NODE_ENV === "development") {
    logger.error("❌ 错误信息：", err.stack);
  }

  // 对于非操作性错误（如编程错误），记录日志但不暴露细节给客户端
  if (!err.isOperational) {
    logger.error("💥 严重错误！即将退出...", err);
    process.exit(1);
  }

  logger.error(err.message, {
    stack: err.stack,
    path: req.path,
    method: req.method,
    query: req.query,
    body: req.body,
  });

  res.status(statusCode).json({
    code: statusCode,
    msg: message || "服务器内部错误",
  });
});

// 静态资源托管
app.use(express.static("public"));
// 让浏览器可以访问上传后的图片
app.use("/images", express.static(path.join(__dirname, "../uploads/images")));

// 解决跨域
app.use(cors());
// 可选：配置白名单
app.use(
  cors({
    // 指定允许访问的源（域名+端口），只允许这两个本地开发地址访问
    // http://localhost:3000 通常是 React/Vue 等前端开发服务器端口
    // http://localhost:5173 通常是 Vite 开发服务器端口
    origin: ["http://localhost:3000", "http://localhost:5173"],
    // 允许跨域请求携带认证信息（如 cookies、HTTP认证等）
    credentials: true,
  }),
);

// 防 XSS/Click Jacking 攻击
app.use(helmet());

// 简单限流器
const limiter = rateLimiter({
  windowMs: 1 * 60 * 1000, // 1 分钟
  max: 100, // 每个 IP 每 1 分钟最多请求 100 次
});
app.use(limiter);

module.exports = app;

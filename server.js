const path = require("node:path");
// 根据环境变量决定使用哪个配置文件
// 注意这里必须在app之前加载，否则 dotenv 环境变量无法加载
const env = process.env.NODE_ENV || "development";
require("dotenv").config({
  path: path.resolve(process.cwd(), `.env.${env}`),
});

const app = require("./src/app.js");
const logger = require("./src/utils/logger");

const PROT = process.env.PORT;

app.listen(PROT, () => {
  logger.info(`🚀 服务已启动：http://localhost:${PROT}`);
});

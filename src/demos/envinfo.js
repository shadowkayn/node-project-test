// 配合dotenv查看环境信息

import "dotenv/config.js";
import os from "os";

console.log("--- 环境信息 ---");
console.log("系统平台", process.platform);
console.log("Node版本", process.version);
console.log("项目端口号", process.env.PORT);
console.log("当前环境", process.env.NODE_ENV);
console.log("项目根目录", process.cwd());
console.log("CPU信息", os.cpus());
console.log("内存信息", os.totalmem());

console.log("--- 系统信息 ---");
console.log("CPU 核心数量", os.cpus().length);
console.log("系统名称", os.hostname());
console.log("系统时间", os.uptime());
console.log("系统信息", os.type());
console.log("用户信息", os.userInfo());
console.log("系统版本", os.version());
console.log("系统架构", os.arch());

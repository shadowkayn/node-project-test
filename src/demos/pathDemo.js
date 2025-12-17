// commonJs 写法
const path = require("node:path");

// ES Module 写法
// 当前文件路径（ESModule 中没有 __dirname，需要自己构造）
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);
// console.log("当前文件路径：", __filename);
// console.log("当前目录路径：", __dirname);

const { renameFiles } = require("../utils/fileTools");

/**
 * path模块 常用方法
 */

console.log("--- path模块 ---");
// 当前目录
console.log("当前目录", path.resolve());
// 路径拼接
console.log("拼接路径", path.join("src", "index.js"));
// 转化为结对路径
console.log("绝对路径", path.resolve("src/demos/testFiles"));
// 获取文件名
console.log("文件名", path.basename("src/index.js"));
// 获取文件扩展名
console.log("扩展名", path.extname("src/index.html"));
// 获取上级目录
console.log("上级目录", path.dirname("src/demo/index.js"));

const targetFolder = "src/demos/testFiles";
renameFiles(targetFolder);

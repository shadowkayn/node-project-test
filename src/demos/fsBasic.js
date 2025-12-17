const fs = require("node:fs");
const path = require("node:path");

const filePath = path.join(__dirname, "/fsFiles/testFiles/hello.txt");

console.log("--- 文件系统 ---", filePath);

// 确保目录存在
const dirPath = path.dirname(filePath);
console.log("目录路径：", dirPath);
// return;
if (!fs.existsSync(dirPath)) {
  fs.mkdirSync(dirPath, { recursive: true });
}

// ✏️ 写入文件
fs.writeFileSync(filePath, "Hello Node.js!\n学习文件操作", "utf8");
console.log("写入成功");

// 📖 读取文件（同步）
console.time("sync read");
const content = fs.readFileSync(filePath, "utf-8");
console.log("文件内容：\n", content);
console.timeEnd("sync read");

// 📖 异步读取文件
console.time("async read");
fs.readFile(filePath, "utf-8", (err, data) => {
  if (err) return console.error("❌ 读取失败：", err);
  console.log("异步读取内容：\n", data);
  console.timeEnd("async read");
});

const fs = require("node:fs");
const path = require("node:path");

/**
 * 批量重命名文件
 * @param folderPath 文件夹路径
 */
function renameFiles(folderPath) {
  const files = fs.readdirSync(folderPath);
  console.log("files", files);
  files.forEach((file, index) => {
    const ext = path.extname(file);
    const newName = `${index + 1}${ext}`;
    const oldPath = path.join(folderPath, file);
    const newPath = path.join(folderPath, newName);

    console.log("oldPath", oldPath, "newPath", newPath);
    fs.renameSync(oldPath, newPath);
  });
}

/**
 * 递归统计文件夹信息
 * @param dirPath
 */
// 判断命令行参数
const processArgs = process.argv[2];
// 如果传入的是相对路径，则转为绝对路径,反之默认整个项目根目录
const folder = processArgs
  ? path.resolve(process.cwd(), processArgs)
  : process.cwd();

let totalSize = 0;
const fileTypeCount = {};

function analyzeDir(dirPath) {
  const files = fs.readdirSync(dirPath);
  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);
    try {
      // 获取文件信息
      const stats = fs.statSync(fullPath);
      if (stats.isFile()) {
        totalSize += stats.size;
        const ext = path.extname(file) || "noExt";
        fileTypeCount[ext] = (fileTypeCount[ext] || 0) + 1;
      } else if (stats.isDirectory()) {
        // 如果是目录，则递归调用，且跳过 node_modules 、idea 等目录
        if (
          !file.startsWith(".") &&
          !file.startsWith("node_modules") &&
          !file.startsWith("idea")
        ) {
          analyzeDir(fullPath);
        }
      }
    } catch (e) {
      console.warn("无法访问", e);
    }
  });
}

analyzeDir(folder);
console.log("📂 文件夹：", folder);
console.log(
  "📄 总文件数：",
  Object.values(fileTypeCount).reduce((a, b) => a + b, 0),
);
console.log("📊 各类型统计：", fileTypeCount);
console.log("📦 文件总大小：", (totalSize / 1024).toFixed(2), "KB");

module.exports = {
  renameFiles,
};

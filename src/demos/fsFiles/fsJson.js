const fs = require("node:fs");
const path = require("node:path");

const jsonPath = path.join(__dirname, "./testFiles/data.json");
console.log("jsonPath:", jsonPath);

const user = {
  name: "kayn",
  age: 25,
  skills: ["js", "vue", "react", "node"],
};

fs.writeFileSync(jsonPath, JSON.stringify(user, null, 2), "utf-8");
console.log("Json文件 写入成功!");

const jsonStr = fs.readFileSync(jsonPath, "utf-8");
console.log("Json文件 读取结果：", JSON.parse(jsonStr));

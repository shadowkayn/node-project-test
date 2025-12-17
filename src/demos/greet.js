// 使用process获取命令行参数

const args = process.argv.slice(2);
const [lang = "en", name = "kayn"] = args;
if (lang === "en") {
  console.log(`Hello, ${name}`);
} else if (lang === "jp") {
  console.log(`こんにちは、${name}`);
} else if (lang === "zh") {
  console.log(`你好，${name}`);
} else {
  console.log(`language "${lang}" is not supported yet`);
}

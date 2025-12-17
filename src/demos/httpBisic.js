require("dotenv").config();
const http = require("node:http");
const url = require("node:url");
const fs = require("node:fs");
const dirPath = require('node:path')

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const path = parsedUrl.pathname;

  switch (path) {
    // 首页
    case "/":
        res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("Hello World! 欢迎来到首页！");
      break;

    // 读取文件
    case "/text":
        const filePath = dirPath.join(__dirname, "../demos/fsFiles/testFiles/hello.txt");
        fs.readFile(filePath, "utf8", (err, data) => {
          if (err) {
            res.writeHead(500, { "Content-Type": "text/plain; charset=utf-8" });
            res.end("读取文件失败");
          } else {
            res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
            res.end(data);
          }
        });
      break;

    // html页面
    case "/html":
        res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
        res.end(`
            <html lang="en">
                <head><title>Node Server</title></head>
                <body>
                    <h1>你好 node.js!</h1>
                    <p>这是来自 Node 原生 HTTP 服务的 HTML 页面。</p>
                </body>
            </html>
        `);
      break;

    // 接口 返回Json数据
    case "/api/info":
        res.writeHead(200, { "Content-Type": "text/plain; charset=utf-8" });
        res.write("info 接口");
      const data = {
        name: "张三",
        age: 18,
      };
      res.end(JSON.stringify(data));
      break;
    default:
        res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
        res.end("404 Not Found");
        break;
  }
});

server.listen(process.env.PORT, () => {
    console.log(`服务启动成功，端口：${process.env.PORT}`);
    console.log(`✅ 服务器运行中：http://localhost:${process.env.PORT}`);
});

const express = require("express");
const app = express();
// 添加解析JSON的中间件
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello Express!');
})

app.get('/api/json', (req, res) => {
    res.json({
        name: 'Kayn',
        msg: 'Express JSON 返回成功！'
    });
})

app.get('/api/search', (req, res) => {
    const { keyword,limit } = req.query;
    res.json({ keyword,limit });
})

app.get('/user/:id',(req, res) => {
    res.json({
        id: req.params.id,
        message:'获取到用户ID'
    })
})

app.post('/api/login', (req, res) => {
    const { username, password} = req.body;
    res.json({
        username,
        password,
        message: '登录信息已接收！'
    })
})

app.listen(3000, () => {
    console.log('🚀 Express 服务已启动：http://localhost:3000');
});
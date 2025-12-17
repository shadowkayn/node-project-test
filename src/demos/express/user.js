// 路由分模块管理，这是其中一个user模块
const express = require('express')
const router = express.Router()

let users = [
    { id: 1, name: 'Kayn' },
    { id: 2, name: 'Leo' },
];

router.get('/', (req, res) => {
  res.json(users)
})

router.get('/:id', (req, res) => {
  const user = users.find(user => user.id === parseInt(req.params.id))
  if (!user) res.status(404).send('用户不存在')
  res.json(user || {})
})

router.post('/add', (req, res) => {
    const { name } = req.body;
    const newUser = { id: Date.now(), name };
    users.push(newUser);
    res.json(newUser);
})

router.put('/edit', (req, res) => {
    const { id } = req.body;
    const user = users.find(user => user.id === parseInt(id))
    if (!user) res.status(404).send('用户不存在')
    user.name = req.body.name
    res.json(user)
})

router.delete('/delete', (req, res) => {
    const { id } = req.body;
    const user = users.find(user => user.id === parseInt(id))
    if (!user) res.status(404).send('用户不存在')
    const index = users.indexOf(user)
    users.splice(index, 1)
    res.json(user)
})

module.exports = router
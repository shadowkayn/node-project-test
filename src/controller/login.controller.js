const jwt = require('jsonwebtoken')

function login(req, res) {
    const user = { id: 1, name: 'Kayn' }
    const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '1h' })
    res.json({ token })
}

// 验证token中间件
function authMiddleware(req, res, next) {
    const token = req.headers.authorization?.replace('Bearer ', '')

    if (!token) {
        return res.status(401).json({ message: 'No token provided' })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decoded.user
        next()
    } catch (error) {
        return res.status(401).json({ message: 'Invalid token' })
    }
}

module.exports = {
    login,
    authMiddleware
}
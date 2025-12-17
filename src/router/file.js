const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require("node:path");

// 配置存储规则（文件名和存储位置）
const storage = multer.diskStorage({
    destination(req, file, cb) {
        const fullPath = path.join(__dirname, '../../uploads/images');
        console.log('上传路径:', fullPath);
        cb(null, fullPath)
    },
    filename(req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext)
    }
})

const upload = multer({ storage });

const { uploadFunc, downloadFunc } = require('../controller/file.controller.js');

router.post('/upload',upload.single('file'), uploadFunc)
router.get('/download/:filename', downloadFunc)

module.exports = router;
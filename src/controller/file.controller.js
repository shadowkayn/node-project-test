const path = require('path');

function uploadFunc(req, res) {
    const file = req.file;
    res.json({
        message:'上传成功',
        filename: file.filename,
        url: `/images/${file.filename}`  // 返回可访问的 URL
    })
}

function downloadFunc(req, res) {
    const { filename } = req.params;
    // 根据项目静态资源位置，拼接路径
    const filePath = path.join(__dirname, '../../uploads/images', filename);
    console.log('下载路径:', filePath,filename)

    res.download(filePath, filename, (err) => {
        if (err) {
            console.error('下载错误：', err);
            if (!res.headersSent) {
                res.status(404).json({
                    code: 404,
                    message: '文件不存在',
                })
            }
        }
    })
}

module.exports = {
    uploadFunc,
    downloadFunc
}
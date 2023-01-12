const multer = require('multer')

const path = require('path')

const imageStorage = multer.diskStorage({
    destination: 'public/img',
    filename: function (req, file, cb) {
        cb(null, Date.now() + String(Math.floor(Math.random() * 1000)) + "_" + file.originalname + path.extname(file.originalname))
    }
})
const imageUpload = multer({
    storage: imageStorage,
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(png|jpg)$/)) {//regex para deixar apenas entrada de .jpg ou .png
            return (new Error("Por favor, envie apenas jpg ou png!"))
        }
        cb(undefined, true)
    }
})

module.exports = { imageUpload }
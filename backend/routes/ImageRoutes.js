const router = require('express').Router()

//MIDDLEWARE
const { imageUpload } = require('../helpers/image-upload')

const ImageController = require('../controllers/ImageController')

//ROUTES
router.post('/upload', imageUpload.array('images'), ImageController.imageUp)

module.exports = router
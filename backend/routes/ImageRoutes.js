const router = require('express').Router()

const ImageController = require('../controllers/ImageController')

router.post('/upload', ImageController.imageUp)

module.exports = router
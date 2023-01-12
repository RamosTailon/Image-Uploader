const router = require('express').Router()

//MIDDLEWARE
const { imageUpload } = require('../helpers/image-upload')

const ImageController = require('../controllers/ImageController')

//ROUTES
router.post('/upload', imageUpload.array('images'), ImageController.imageUp)

router.get('/all', ImageController.getAll)
router.get('/:id', ImageController.getOne)

router.delete('/:id', ImageController.removeImageById)

router.patch('/:id', imageUpload.array('images'), ImageController.updateImage)

module.exports = router
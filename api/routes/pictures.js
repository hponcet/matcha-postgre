const express = require('express')
const router = express.Router()

const controller = require('../controllers/pictures')
const userJwt = require('../services/authentication').userJwt
const imageUpload = require('../middlewares/image-upload')

router.get('/pictures', userJwt, controller.getPictures)
router.post('/pictures', userJwt, imageUpload, controller.addPicture)
router.delete('/pictures', userJwt, controller.removePicture)

module.exports = router

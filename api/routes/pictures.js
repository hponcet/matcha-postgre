const express = require('express')
const router = express.Router()

const controller = require('../controllers/pictures')
const userJwt = require('../services/authentication').userJwt
const imageUpload = require('../middlewares/image-upload')

router.get('/pictures', userJwt, controller.getPictures)
router.post('/pictures', userJwt, imageUpload, controller.addPicture)
router.delete('/pictures', userJwt, controller.removePicture)
router.get('/pictures/profil', userJwt, controller.getProfilPicture)
router.post('/pictures/profil', userJwt, controller.updateProfilPicture)

module.exports = router

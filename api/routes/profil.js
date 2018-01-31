const express = require('express')
const router = express.Router()
const userJwt = require('../services/authentication').userJwt

const profilController = require('../controllers/profil')
const interactionsController = require('../controllers/interactions')
const picturesController = require('../controllers/pictures')
const imageUpload = require('../middlewares/image-upload')

router.get('/profils/me', userJwt, profilController.getProfil)
router.post('/profils/me', userJwt, profilController.updateProfil)

router.get('/profils', userJwt, profilController.searchProfils)
router.post('/profils', userJwt, profilController.searchProfils)
router.get('/profils/:userId', userJwt, profilController.getPublicProfil)

router.get('/profils/me/likes', userJwt, interactionsController.getLikes)
// router.put('/profils/like', userJwt, interactionsController.newLike)

// router.put('/profils/view', userJwt, interactionsController.profilView)

router.post('/profils/pictures', userJwt, imageUpload, picturesController.addPicture)
router.delete('/profils/pictures', userJwt, picturesController.removePicture)
router.post('/profils/me/pictures', userJwt, picturesController.updateProfilPicture)

module.exports = router

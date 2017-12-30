const express = require('express')
const router = express.Router()

const controller = require('../controllers/profil')
const userJwt = require('../services/authentication').userJwt

router.get('/profils/me', userJwt, controller.getProfil)
router.post('/profils/me', userJwt, controller.updateProfil)
router.get('/profils', userJwt, controller.getProfils)
router.post('/profils', userJwt, controller.searchProfils)
router.get('/profils/:userId', userJwt, controller.getPublicProfil)

module.exports = router

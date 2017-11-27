const express = require('express')
const router = express.Router()

const controller = require('../controllers/profil')
const userJwt = require('../services/authentication').userJwt

router.get('/profils/me', userJwt, controller.getProfil)
router.post('/profils/me', userJwt, controller.updateProfil)

module.exports = router

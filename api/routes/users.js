const express = require('express')
const router = express.Router()

const controller = require('../controllers/users')
const userJwt = require('../services/authentication').userJwt

router.get('/users/me', userJwt, controller.getUser)

module.exports = router

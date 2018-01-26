const express = require('express')
const router = express.Router()

const usersController = require('../controllers/users')
const userJwt = require('../services/authentication').userJwt

router.get('/users/me', userJwt, usersController.getUser)

module.exports = router

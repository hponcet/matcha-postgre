const express = require('express')
const router = express.Router()

const controller = require('../controllers/tags')
const userJwt = require('../services/authentication').userJwt

router.get('/tags', userJwt, controller.getTags)
router.patch('/tags', userJwt, controller.updateTag)
router.post('/tags', userJwt, controller.addTag)
router.delete('/tags', userJwt, controller.removeTag)

module.exports = router

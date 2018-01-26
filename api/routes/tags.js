const express = require('express')
const router = express.Router()

const tagsController = require('../controllers/tags')
const userJwt = require('../services/authentication').userJwt

router.get('/tags', userJwt, tagsController.getTags)
router.patch('/tags', userJwt, tagsController.addTag)
router.post('/tags', userJwt, tagsController.addTag)
router.delete('/tags', userJwt, tagsController.removeTag)

module.exports = router

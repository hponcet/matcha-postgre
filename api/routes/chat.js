const express = require('express')
const router = express.Router()

const chatController = require('../controllers/chat')
const userJwt = require('../services/authentication').userJwt

router.get('/chat', userJwt, chatController.getAllThreads)
router.post('/chat', userJwt, chatController.getThread)
router.post('/chat/message', userJwt, chatController.sendMessage)

module.exports = router

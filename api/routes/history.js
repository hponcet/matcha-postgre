const express = require('express')
const router = express.Router()

const historyController = require('../controllers/history')
const userJwt = require('../services/authentication').userJwt

router.get('/history', userJwt, historyController.getHistory)
// router.put('/history', userJwt, historyController.archiveNews)
// router.post('/history', userJwt, historyController.archiveAllNews)

module.exports = router

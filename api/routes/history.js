const express = require('express')
const router = express.Router()

const historyController = require('../controllers/history')
const userJwt = require('../services/authentication').userJwt

router.post('/notifications', userJwt, historyController.getNotifications)
router.delete('/notifications', userJwt, historyController.archiveNotification)
router.delete('/notifications/all', userJwt, historyController.archiveAllNotifications)

router.get('/history', userJwt, historyController.getHistory)

module.exports = router

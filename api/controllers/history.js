const historyService = require('../services/history')

const getNotifications = async (req, res, next) => {
  try {
    const {status} = req.body
    const history = await historyService.getHistory(req.token.userId, status)
    return res.send(history)
  } catch (err) {
    return next(err)
  }
}

const archiveNotification = async (req, res, next) => {
  try {
    const { newsId } = req.body
    const { userId } = req.token

    await historyService.archiveNotification(userId, newsId)
    const history = await historyService.getHistory(userId, 'NOTIFICATION')
    return res.send(history)
  } catch (err) {
    return next(err)
  }
}

const archiveAllNotifications = async (req, res, next) => {
  try {
    const { userId } = req.token

    await historyService.archiveAllNotifications(userId)
    const history = await historyService.getHistory(userId, 'NOTIFICATION')
    return res.send(history)
  } catch (err) {
    return next(err)
  }
}

const getHistory = async (req, res, next) => {
  try {
    const history = {
      news: await historyService.getHistory(req.token.userId, 'NOTIFICATION'),
      archived: await historyService.getHistory(req.token.userId, 'ARCHIVED')
    }
    return res.send(history)
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  getNotifications,
  archiveNotification,
  archiveAllNotifications,
  getHistory
}

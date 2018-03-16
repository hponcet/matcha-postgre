const profilService = require('../services/profil')
const chatService = require('../services/chat')
const historyService = require('../services/history')
const socketService = require('../services/socket')
const interactionsService = require('../services/interactions')

const like = async (req, res, next) => {
  try {
    const { userId } = req.token
    const { profilId: likedId } = req.body

    const userProfil = await profilService.getProfilById(userId)
    const likedProfil = await profilService.getProfilById(likedId)
    const like = await interactionsService.getLike(userId, likedId)
    const match = await interactionsService.getMatch(userId, likedId)

    if (!like) {
      await interactionsService.like(userId, likedId)
      await socketService.likeNotification(userProfil, likedProfil)
    } else if (!match && like.id !== userId) {
      const chatId = await chatService.createNewChat(userId, likedId)
      await interactionsService.match(userId, likedId, chatId)
      await socketService.matchNotification(userProfil, likedProfil, chatId)
    }

    const likes = await interactionsService.getLikes(userId, likedId)

    return res.send(likes)
  } catch (err) {
    return next(err)
  }
}

const getLikes = async (req, res, next) => {
  try {
    const { userId } = req.token
    const { profilId } = req.body

    return await interactionsService.getLikes(userId, profilId)
  } catch (err) {
    return next(err)
  }
}

const profilView = async (req, res, next) => {
  try {
    const { profilId } = req.body
    const userProfil = await profilService.getProfilById(req.token.userId)
    const notification = {
      type: 'VIEW',
      id: profilId,
      actionUrl: `/dashboard/profil/${userProfil.id}`,
      profilUrl: `/dashboard/profil/${userProfil.id}`,
      profilPicture: userProfil.profilPicture,
      pseudo: userProfil.pseudo,
      message: ' à vu votre profil.'
    }

    await historyService.addNews(profilId, notification)
    await socketService.sendNotification(profilId, notification)
    return res.send()
  } catch (err) {
    return next(err)
  }
}
module.exports = {
  like,
  getLikes,
  profilView
}

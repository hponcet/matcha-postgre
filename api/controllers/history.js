const map = require('lodash/map')

const profilService = require('../services/profil')
const historyService = require('../services/history')

const getHistory = async (req, res, next) => {
  try {
    const history = await historyService.getHistory(req.token.userId)
    return history
  } catch (err) {
    return next(err)
  }
}

// const archiveNews = (req, res, next) => {
//   return MongoClient.connect(dbUrl, mongoSettings, (err, client) => {
//     if (err) return next(err)
//     const db = client.db(dbParams.database)
//     return profilService.getProfilPartByUserId(db, req.token.userId, {_id: 1})
//     .then((profilId) => {
//       return historyService.archiveNews(db, profilId._id, req.body.newsId)
//       .then(() => {
//         return profilService.getProfilPartByUserId(db, req.token.userId, {history: 1})
//         .then((profil) => res.send(profil.history))
//         .catch(next)
//       }).catch(next)
//     }).catch(next)
//   })
// }

// const archiveAllNews = (req, res, next) => {
//   return MongoClient.connect(dbUrl, mongoSettings, (err, client) => {
//     if (err) return next(err)
//     const db = client.db(dbParams.database)
//     return profilService.getProfilPartByUserId(db, req.token.userId, {_id: 1})
//     .then((profilId) => {
//       return historyService.getAllNews(db, profilId._id)
//       .then((news) => {
//         return Promise.all(
//           map(news, (notification) => {
//             return historyService.archiveNews(db, profilId._id, notification._id)
//           })
//         ).then(() => {
//           return profilService.getProfilPartByUserId(db, req.token.userId, {history: 1})
//           .then((profil) => res.send(profil.history))
//           .catch(next)
//         }).catch(next)
//       }).catch(next)
//     }).catch(next)
//   })
// }

module.exports = {
  getHistory,
  // archiveNews,
  // archiveAllNews
}

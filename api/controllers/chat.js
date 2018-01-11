const map = require('lodash/map')

const MongoClient = require('mongodb').MongoClient
const dbParams = require('../config/config').DATABASE
const dbUrl = `${dbParams.dialect}://${dbParams.host}:${dbParams.port}/${dbParams.database}`
const mongoSettings = require('../config/config').DATABASE.settings

const profilService = require('../services/profil')
const chatService = require('../services/chat')
const socketService = require('../services/socket')

const getAllThreads = (req, res, next) => {
  return MongoClient.connect(dbUrl, mongoSettings, (err, client) => {
    if (err) return next(err)
    const db = client.db(dbParams.database)
    return profilService.getProfilPartByUserId(db, req.token.userId, {_id: 1})
    .then((profilId) => {
      return getProfilsMatched(db, profilId)
      .then(profils => res.send(profils))
      .catch(next)
    }).catch(next)
  })
}

const getProfilsMatched = (db, profilId) => {
  return profilService.getProfilPartById(db, profilId._id, {matchs: 1})
  .then((profil) => {
    return Promise.all(map(profil.matchs, (match, index) => {
      return profilService.getParsedProfilById(db, match.profilId)
    }))
    .then((profils) => {
      return Promise.all(map(profil.matchs, (match, index) => {
        return chatService.getThreadsUpdate(db, match.chatId)
      }))
      .then((threads) => {
        for (let index = 0; index < profil.matchs.length; index++) {
          profils[index].chatId = profil.matchs[index].chatId
          profils[index].updated = threads[index].updated
        }
        return profils
      })
    }).catch(err => err)
  }).catch(err => err)
}

const getThread = (req, res, next) => {
  return MongoClient.connect(dbUrl, mongoSettings, (err, client) => {
    if (err) return next(err)
    const db = client.db(dbParams.database)
    return chatService.getThread(db, req.body.chatId)
    .then((thread) => {
      return res.send(thread)
    })
    .catch(next)
  })
}

const sendMessage = (req, res, next) => {
  return MongoClient.connect(dbUrl, mongoSettings, (err, client) => {
    if (err) return next(err)
    const db = client.db(dbParams.database)
    const message = {
      content: req.body.message.content,
      profilId: req.body.message.profilId,
      date: req.body.message.date
    }
    const { destId, chatId } = req.body.message
    return chatService.addMessage(db, message, chatId)
    .then(() => {
      return socketService.sendMessage(destId, chatId, message)
      .then(() => res.send())
    }).catch(next)
  })
}

module.exports = {
  getAllThreads,
  getThread,
  sendMessage
}

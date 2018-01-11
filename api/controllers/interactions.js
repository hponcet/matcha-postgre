const _ = require('lodash')
const createError = require('http-errors')
const errors = require('../errors')

const MongoClient = require('mongodb').MongoClient
const dbParams = require('../config/config').DATABASE
const dbUrl = `${dbParams.dialect}://${dbParams.host}:${dbParams.port}/${dbParams.database}`
const mongoSettings = require('../config/config').DATABASE.settings

const ObjectID = require('mongodb').ObjectID
const ValidateObjectId = /^[0-9a-fA-F]{24}$/
const profilService = require('../services/profil')
const chatService = require('../services/chat')
const historyService = require('../services/history')
const socketService = require('../services/socket')

const newLike = (req, res, next) => {
  if (!_.has(req, 'body.profilId') || !ValidateObjectId.test(req.body.profilId)) {
    return next(createError.BadRequest(errors.BAD_PROFIL_ID))
  }

  return MongoClient.connect(dbUrl, mongoSettings, (err, client) => {
    if (err) return next(err)
    const db = client.db(dbParams.database)
    return profilService.getProfilPartByUserId(db, req.token.userId, {likes: 1})
    .then((userProfil) => {
      const userProfilId = userProfil._id
      const profilId = req.body.profilId

      if (userProfil.likes.indexOf(profilId) !== -1) {
        return res.send(userProfil.likes)
      }

      return profilService.addLike(db, userProfilId, profilId)
      .then(() => {
        return getProfilLikes(db, profilId)
        .then(profilLikes => {
          profilLikes.indexOf(userProfilId.toString()) === -1
          ? like(db, userProfilId.toString(), profilId.toString())
          : match(db, userProfilId.toString(), profilId.toString())
          return getProfilLikes(db, userProfilId)
          .then(likes => res.send(likes))
          .catch(next)
        }).catch(next)
      }).catch(next)
    }).catch(next)
  })
}

const getProfilLikes = (db, profilId) => {
  return profilService.getProfilPartById(db, profilId, {likes: 1})
  .then(profil => profil.likes)
  .catch(err => err)
}

const match = (db, userProfilId, profilId) => {
  return chatService.createNewChat(db, userProfilId, profilId)
  .then((chatId) => addMatch(db, userProfilId, profilId, chatId)
  .then(() => addMatch(db, profilId, userProfilId, chatId)
  ).catch(err => err)
  ).catch(err => err)
}

const getLikes = (req, res, next) => {
  return MongoClient.connect(dbUrl, mongoSettings, (err, client) => {
    if (err) return next(err)
    const db = client.db(dbParams.database)
    return profilService.getProfilPartByUserId(db, req.token.userId, {likes: 1})
    .then((profil) => res.send(profil.likes))
    .catch(next)
  })
}

const addMatch = (db, profilId, matchedId, chatId) => {
  return profilService.getProfilById(db, matchedId)
  .then((matchedProfil) => {
    return profilService.addMatch(db, profilId, matchedId, chatId)
    .then(() => {
      const notification = {
        _id: new ObjectID(),
        type: 'MATCH',
        actionUrl: `/dashboard/chat?thread=${chatId}`,
        profilUrl: `/dashboard/profil/${matchedProfil._id}`,
        profilPicture: matchedProfil.profilPicture,
        pseudo: matchedProfil.pseudo,
        message: ' et vous avez matché ! Dites lui un mot.',
        date: Date.now()
      }
      return historyService.addNews(db, profilId, notification)
      .then(() => socketService.sendNotification(profilId, notification))
      .catch(err => err)
    }).catch(err => err)
  }).catch(err => err)
}

const like = (db, userProfilId, profilId) => {
  return addProfilLike(db, userProfilId, profilId)
  .then(() => addUserLike(db, userProfilId, profilId)
  .catch(err => err)
  ).catch(err => err)
}

const addUserLike = (db, userProfilId, profilId) => {
  return profilService.getProfilById(db, profilId)
  .then((profil) => {
    const notification = {
      _id: new ObjectID(),
      type: 'LIKE',
      actionUrl: `/dashboard/profil/${profil._id}`,
      profilUrl: `/dashboard/profil/${profil._id}`,
      profilPicture: profil.profilPicture,
      pseudo: profil.pseudo,
      message: ' vous plais.',
      date: Date.now()
    }
    return historyService.addArchive(db, userProfilId, notification)
  }).catch(err => err)
}

const addProfilLike = (db, userProfilId, profilId) => {
  return profilService.getProfilById(db, userProfilId)
  .then((userProfil) => {
    const notification = {
      _id: new ObjectID(),
      type: 'LIKE',
      actionUrl: `/dashboard/profil/${userProfil._id}`,
      profilUrl: `/dashboard/profil/${userProfil._id}`,
      profilPicture: userProfil.profilPicture,
      pseudo: userProfil.pseudo,
      message: ' vous apprécie.',
      date: Date.now()
    }
    return historyService.addNews(db, profilId, notification)
    .then(() => socketService.sendNotification(profilId, notification))
  }).catch(err => err)
}

const profilView = (req, res, next) => {
  return MongoClient.connect(dbUrl, mongoSettings, (err, client) => {
    if (err) return next(err)
    const db = client.db(dbParams.database)
    return profilService.getProfilByUserId(db, req.token.userId)
    .then((userProfil) => {
      const notification = {
        _id: new ObjectID(),
        type: 'VIEW',
        actionUrl: `/dashboard/profil/${userProfil._id}`,
        profilUrl: `/dashboard/profil/${userProfil._id}`,
        profilPicture: userProfil.profilPicture,
        pseudo: userProfil.pseudo,
        message: ' à vu votre profil.',
        date: Date.now()
      }
      return historyService.addNews(db, req.body.profilId, notification)
      .then(() => socketService.sendNotification(req.body.profilId, notification))
    }).catch(err => err)
  })
}

module.exports = {
  newLike,
  getLikes,
  profilView
}

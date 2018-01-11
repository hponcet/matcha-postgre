const createError = require('http-errors')
const _ = require('lodash')
const config = require('../config/config')
const errors = require('../errors')

const MongoClient = require('mongodb').MongoClient
const dbParams = require('../config/config').DATABASE
const dbUrl = `${dbParams.dialect}://${dbParams.host}:${dbParams.port}/${dbParams.database}`
const mongoSettings = require('../config/config').DATABASE.settings

const PicturesService = require('../services/pictures')
const profilsService = require('../services/profil')

const addPicture = (req, res, next) => {
  if (!_.has(req, 'file') || _.isEmpty(req.file)) return next(createError.BadRequest(errors.PICTURE_EMPTY_FILE))
  if (!_.has(req, 'file.mimetype') || _.isEmpty(req.file.mimetype)) return next(createError.BadRequest(errors.PICTURE_NO_MIMETYPE))
  if (!_.has(req, 'file.destination') || _.isEmpty(req.file.destination)) return next(createError.BadRequest(errors.PICTURE_BAD_SERVER_UPLOAD))
  if (!_.has(req, 'file.path') || _.isEmpty(req.file.path)) return next(createError.BadRequest(errors.PICTURE_BAD_SERVER_UPLOAD))
  if (!_.has(req, 'file.size')) return next(createError.BadRequest(errors.PICTURE_CANT_GET_SIZE))
  if (!_.has(req, 'body.index') || _.isEmpty(req.body.index)) return next(createError.BadRequest(errors.PICTURE_EMPTY_INDEX))
  if ((req.body.index * 1) > 4 || (req.body.index * 1) < 0) return next(createError.BadRequest(errors.PICTURE_BAD_INDEX))

  return MongoClient.connect(dbUrl, mongoSettings, (err, client) => {
    if (err) return next(err)
    const db = client.db(dbParams.database)
    return PicturesService.addPicture(db, req.file, req.body.index, req.token.userId)
    .then(() => {
      return profilsService.getParsedProfilByUserId(db, req.token.userId)
      .then((profil) => res.send(profil))
      .catch(next)
    })
    .catch(next)
  })
}

const removePicture = (req, res, next) => {
  if (!_.has(req, 'body.picture') || _.isEmpty(req.body.picture) ||
    !_.has(req, 'body.picture.url') || _.isEmpty(req.body.picture.url) ||
    !_.has(req, 'body.picture.index')) return next(createError.BadRequest(errors.BAD_PICTURE_SIGNATURE))

  return MongoClient.connect(dbUrl, mongoSettings, (err, client) => {
    if (err) return next(err)
    const db = client.db(dbParams.database)
    return PicturesService.removePicture(db, req.body.picture.url, req.body.picture.index, req.token.userId)
    .then((pictures) => {
      if (pictures.length === 0) {
        PicturesService.updateProfilPicture(db, `${config.HOST}:${config.PORT}/files/assets/empty_avatar.jpg`, req.token.userId)
      }
      return profilsService.getParsedProfilByUserId(db, req.token.userId)
      .then((profil) => res.send(profil))
      .catch(next)
    })
    .catch(next)
  })
}

const updateProfilPicture = (req, res, next) => {
  if (!_.has(req, 'body.pictureUrl') || _.isEmpty(req.body.pictureUrl)) {
    return next(createError.BadRequest(errors.BAD_PROFIL_PICTURE))
  }

  return MongoClient.connect(dbUrl, mongoSettings, (err, client) => {
    if (err) return next(err)
    const db = client.db(dbParams.database)
    return PicturesService.updateProfilPicture(db, req.body.pictureUrl, req.token.userId)
    .then(() => {
      return profilsService.getParsedProfilByUserId(db, req.token.userId)
      .then((profil) => res.send(profil))
      .catch(next)
    })
    .catch(next)
  })
}

module.exports = {
  addPicture,
  removePicture,
  updateProfilPicture
}

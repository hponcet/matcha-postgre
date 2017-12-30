const createError = require('http-errors')
const _ = require('lodash')
const config = require('../config/config')
const PicturesService = require('../services/pictures')
const errors = require('../errors')

const getPictures = (req, res, next) => {
  return PicturesService.getPictures(req.token.userId)
  .then((pictures) => {
    if (!pictures) return next(createError.BadRequest(errors.BAD_PROFIL_PICTURE))
    res.send(pictures.map((picture) => picture.picturePublicPath))
  })
  .catch(next)
}

const addPicture = (req, res, next) => {
  if (!_.has(req, 'file') || _.isEmpty(req.file)) return next(createError.BadRequest(errors.PICTURE_EMPTY_FILE))
  if (!_.has(req, 'file.mimetype') || _.isEmpty(req.file.mimetype)) return next(createError.BadRequest(errors.PICTURE_NO_MIMETYPE))
  if (!_.has(req, 'file.destination') || _.isEmpty(req.file.destination)) return next(createError.BadRequest(errors.PICTURE_BAD_SERVER_UPLOAD))
  if (!_.has(req, 'file.path') || _.isEmpty(req.file.path)) return next(createError.BadRequest(errors.PICTURE_BAD_SERVER_UPLOAD))
  if (!_.has(req, 'file.size')) return next(createError.BadRequest(errors.PICTURE_CANT_GET_SIZE))
  if (!_.has(req, 'body.index') || _.isEmpty(req.body.index)) return next(createError.BadRequest(errors.PICTURE_EMPTY_INDEX))
  if ((req.body.index * 1) > 4 || (req.body.index * 1) < 0) return next(createError.BadRequest(errors.PICTURE_BAD_INDEX))

  return PicturesService.addPicture(req.file, req.body.index, req.token.userId)
  .then((pictures) => res.send(pictures))
  .catch(next)
}

const removePicture = (req, res, next) => {
  if (!_.has(req, 'body.picture') || _.isEmpty(req.body.picture) ||
    !_.has(req, 'body.picture.url') || _.isEmpty(req.body.picture.url) ||
    !_.has(req, 'body.picture.index')) return next(createError.BadRequest(errors.BAD_PICTURE_SIGNATURE))
  return PicturesService.removePicture(req.body.picture.url, req.body.picture.index, req.token.userId)
  .then((pictures) => {
    if (pictures.length === 0) PicturesService.updateProfilPicture(`${config.HOST}:${config.PORT}/files/assets/empty_avatar.jpg`, req.token.userId)
    res.send(pictures)
  })
  .catch(next)
}

const updateProfilPicture = (req, res, next) => {
  if (!_.has(req, 'body.pictureUrl') || _.isEmpty(req.body.pictureUrl)) {
    return next(createError.BadRequest(errors.BAD_PROFIL_PICTURE))
  }
  return PicturesService.updateProfilPicture(req.body.pictureUrl, req.token.userId)
  .then((profilPicture) => res.send(profilPicture))
  .catch(next)
}

const getProfilPicture = (req, res, next) => {
  return PicturesService.getProfilePicture(req.token.userId)
  .then((profilPicture) => res.send(profilPicture))
  .catch(next)
}

module.exports = {
  getPictures,
  addPicture,
  removePicture,
  getProfilPicture,
  updateProfilPicture
}

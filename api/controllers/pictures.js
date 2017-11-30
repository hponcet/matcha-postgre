const createError = require('http-errors')
const _ = require('lodash')

const PicturesService = require('../services/pictures')
const errors = require('../errors')

const getPictures = (req, res, next) => {
  return PicturesService.getPictures(req.token.userId)
  .then((pictures) => res.send(pictures))
}

const addPicture = (req, res, next) => {
  // if (!_.has(req, 'body.picture') || _.isEmpty(req.body.picture) ||
  //   !_.has(req, 'body.picture.data') || _.isEmpty(req.body.picture.data) ||
  //   !_.has(req, 'body.picture.index') || _.isEmpty(req.body.picture.index)) return next(createError.BadRequest(errors.BAD_PICTURE_SIGNATURE))
  // return PicturesService.addPicture(req.picture.data, req.picture.index, req.token.userId)
  // .then((pictures) => res.send(pictures))
  // .catch(next)
  console.log('req.body', req.body)
}

const removePicture = (req, res, next) => {
  if (!_.has(req, 'body.picture') || _.isEmpty(req.body.picture) ||
    !_.has(req, 'body.picture.url') || _.isEmpty(req.body.picture.url) ||
    !_.has(req, 'body.picture.index') || _.isEmpty(req.body.picture.index)) return next(createError.BadRequest(errors.BAD_PICTURE_SIGNATURE))
  return PicturesService.removePicture(req.picture.url, req.picture.index, req.token.userId)
  .then((pictureUrl) => res.send(pictureUrl))
  .catch(next)
}

module.exports = {
  getPictures,
  addPicture,
  removePicture
}

const createError = require('http-errors')
const _ = require('lodash')
const config = require('../config/config')
const errors = require('../errors')

const PicturesService = require('../services/pictures')
const ProfilService = require('../services/profil')

const picturesUrl = `${config.HOST}:${config.PORT}/${config.UPLOAD_PICTURES_PATH}`
const emptyPictureProfil = `${config.HOST}:${config.PORT}/files/assets/empty_avatar.jpg`

const addPicture = async (req, res, next) => {
  if (!_.has(req, 'file') || _.isEmpty(req.file)) return next(createError.BadRequest(errors.PICTURE_EMPTY_FILE))
  if (!_.has(req, 'file.mimetype') || _.isEmpty(req.file.mimetype)) return next(createError.BadRequest(errors.PICTURE_NO_MIMETYPE))
  if (!_.has(req, 'file.destination') || _.isEmpty(req.file.destination)) return next(createError.BadRequest(errors.PICTURE_BAD_SERVER_UPLOAD))
  if (!_.has(req, 'file.path') || _.isEmpty(req.file.path)) return next(createError.BadRequest(errors.PICTURE_BAD_SERVER_UPLOAD))
  if (!_.has(req, 'file.size')) return next(createError.BadRequest(errors.PICTURE_CANT_GET_SIZE))
  if (!_.has(req, 'body.index') || _.isEmpty(req.body.index)) return next(createError.BadRequest(errors.PICTURE_EMPTY_INDEX))
  if ((req.body.index * 1) > 4 || (req.body.index * 1) < 0) return next(createError.BadRequest(errors.PICTURE_BAD_INDEX))

  const {userId} = req.token
  const picture = req.file

  try {
    const localPath = `./${picture.path}`
    const publicPath = `${picturesUrl}/${userId}/${picture.filename}`

    await PicturesService.addPicture(localPath, publicPath, userId)

    const pictures = await PicturesService.getPictures(userId)
    if (pictures.length === 1) {
      await PicturesService.updateProfilPicture(pictures[0].url, userId)
    }

    const profil = await ProfilService.getProfilById(userId)
    return res.send(profil)
  } catch (err) {
    if (err) return next(err)
  }
}

const removePicture = async (req, res, next) => {
  try {
    if (!_.has(req, 'body.index')) return next(createError.BadRequest(errors.BAD_PICTURE_SIGNATURE))

    const {userId} = req.token
    const {index} = req.body

    const profilPicture = await ProfilService.getProfilPicture()
    const picture = await PicturesService.getPicture(index)

    await PicturesService.removePicture(index)
    const pictures = await PicturesService.getPictures(userId)
    if (pictures.length === 0) {
      await PicturesService.updateProfilPicture(emptyPictureProfil, userId)
    }
    if (profilPicture === picture.url && pictures.length > 0) {
      await PicturesService.updateProfilPicture(pictures[0].url, userId)
    }

    const profil = await ProfilService.getProfilById(userId)
    return res.send(profil)
  } catch (err) {
    if (err) return next(err)
  }
}

const updateProfilPicture = async (req, res, next) => {
  if (!_.has(req, 'body.pictureUrl') || _.isEmpty(req.body.pictureUrl)) {
    return next(createError.BadRequest(errors.BAD_PROFIL_PICTURE))
  }

  const {userId} = req.token

  try {
    await PicturesService.updateProfilPicture(req.body.pictureUrl, userId)
    const profil = await ProfilService.getProfilById(userId)
    return res.send(profil)
  } catch (err) {
    if (err) return next(err)
  }
}

module.exports = {
  addPicture,
  removePicture,
  updateProfilPicture
}

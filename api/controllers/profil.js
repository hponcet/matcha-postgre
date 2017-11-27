const createError = require('http-errors')
const _ = require('lodash')

const ValidateObjectId = /^[0-9a-fA-F]{24}$/

const ProfilService = require('../services/profil')
const errors = require('../errors')

const getProfil = (req, res, next) => {
  ProfilService.getProfil(req.token.userId)
  .then((profil) => res.send(profil))
}
const updateProfil = (req, res, next) => {
  if (!_.has(req, 'body.name') || _.isEmpty(req.body.name)) return next(createError.BadRequest(errors.BAD_TAG_ID))
  if (!_.has(req, 'body.id') || _.isEmpty(req.body.id) || !ValidateObjectId.test(req.body.id)) return next(createError.BadRequest(errors.BAD_USER_ID))

  ProfilService.updateTag(req.body.name, req.body.id)
  .catch(next)
}

module.exports = {
  getProfil,
  updateProfil
}

const _ = require('lodash')
const createError = require('http-errors')

const AuthenticationService = require('../services/authentication')
const UsersService = require('../services/users')
const ProfilService = require('../services/profil')
const errors = require('../errors')

const MAJORITY_TIMESTAMP = 567993600000

const signup = (req, res, next) => {
  if (!_.has(req, 'body.email') || _.isEmpty(req.body.email)) return next(createError.BadRequest(errors.EMAIL_MISSING))
  if (!_.has(req, 'body.birthday') || _.isEmpty(req.body.birthday)) return next(createError.BadRequest(errors.BIRTHDAY_MISSING))
  if (Date.now() - Date.parse(req.body.birthday) < MAJORITY_TIMESTAMP) return next(createError.BadRequest(errors.AGE_ERROR))
  if (!_.has(req, 'body.password') || _.isEmpty(req.body.password)) return next(createError.BadRequest(errors.PASSWORD_MISSING))
  if (req.body.password.length < 8) return next(createError.BadRequest(errors.PASSWORD_TO_SHORT))
  if (!_.has(req, 'body.sex') || _.isEmpty(req.body.sex)) return next(createError.BadRequest(errors.SEX_MISSING))
  if (!_.has(req, 'body.pseudo') || _.isEmpty(req.body.pseudo)) return next(createError.BadRequest(errors.PSEUDO_MISSING))

  return UsersService.getByPseudo(req.body.pseudo)
  .then((pseudo) => {
    if (pseudo) return next(createError.BadRequest(errors.PSEUDO_EXIST))
    return UsersService.getByMail(req.body.email)
    .then((email) => {
      if (email) return next(createError.BadRequest(errors.EMAIL_EXIST))
      return UsersService.getGeolocation(req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.connection.remoteAddress)
      .then((location) => {
        return UsersService.add(
          req.body.email,
          req.body.password,
          req.body.sex,
          req.body.firstName || null,
          req.body.lastName || null,
          req.body.pseudo,
          req.body.birthday,
          location
        )
        .then((accessToken) => res.send({accessToken}))
        .catch(next)
      })
      .catch(next)
    })
    .catch(next)
  })
  .catch(next)
}

const login = (req, res, next) => {
  if (!_.has(req, 'body.password') || _.isEmpty(req.body.password)) return next(createError.BadRequest(errors.PASSWORD_MISSING))
  if (!_.has(req, 'body.pseudo') || _.isEmpty(req.body.pseudo)) return next(createError.BadRequest(errors.PSEUDO_MISSING))

  UsersService.getPassword(req.body.pseudo)
  .then((user) => {
    if (!user) return next(createError.BadRequest(errors.LOGIN_UNKNOWN_PSEUDO))
    AuthenticationService.validatePassword(req.body.password, user.password)
    .then((isValid) => {
      if (!isValid) return next(createError.BadRequest(errors.LOGIN_BAD_PASSWORD))
      return UsersService.getGeolocation(req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.connection.remoteAddress)
      .then((location) => ProfilService.updateLocation(location, user._id)
        .then(() => AuthenticationService.buildToken(user._id)
          .then((token) => res.send({ accessToken: token }))
          .catch(next))
        .catch(next))
      .catch(next)
    })
    .catch(next)
  })
  .catch(next)
}

module.exports = {
  signup,
  login
}

const _ = require('lodash')
const createError = require('http-errors')

const AuthenticationService = require('../services/authentication')
const errors = require('../errors')

const signup = (req, res, next) => {
  if (!_.has(req, 'body.email') || _.isEmpty(req.body.email)) return next(createError.BadRequest(errors.EMAIL_MISSING))
  if (!_.has(req, 'body.password') || _.isEmpty(req.body.password)) return next(createError.BadRequest(errors.PASSWORD_MISSING))
  if (req.body.password.length < 8) return next(createError.BadRequest(errors.PASSWORD_TO_SHORT))
  if (!_.has(req, 'body.sex') || _.isEmpty(req.body.type)) return next(createError.BadRequest(errors.SEX_MISSING))
  if (!_.has(req, 'body.pseudo') || _.isEmpty(req.body.firstName)) return next(createError.BadRequest(errors.PSEUDO_MISSING))

  return AuthenticationService.signup(
    req.body.email,
    req.body.password,
    req.body.sex,
    req.body.firstName || null,
    req.body.lastName || null,
    req.body.pseudo
  )
  .then((accessToken) => res.send({accessToken}))
  .catch(next)
}

module.exports = {
  signup
}

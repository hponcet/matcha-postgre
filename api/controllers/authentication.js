const _ = require('lodash')
const createError = require('http-errors')

const AuthenticationService = require('../services/authentication')
const UsersService = require('../services/users')
const ProfilService = require('../services/profil')
const errors = require('../errors')

const MAJORITY_TIMESTAMP = 567993600000

const signup = async (req, res, next) => {
  if (!_.has(req, 'body.email') || _.isEmpty(req.body.email)) return next(createError.BadRequest(errors.EMAIL_MISSING))
  if (!_.has(req, 'body.birthday') || _.isEmpty(req.body.birthday)) return next(createError.BadRequest(errors.BIRTHDAY_MISSING))
  if (Date.now() - Date.parse(req.body.birthday) < MAJORITY_TIMESTAMP) return next(createError.BadRequest(errors.AGE_ERROR))
  if (!_.has(req, 'body.password') || _.isEmpty(req.body.password)) return next(createError.BadRequest(errors.PASSWORD_MISSING))
  if (req.body.password.length < 8) return next(createError.BadRequest(errors.PASSWORD_TO_SHORT))
  if (!_.has(req, 'body.sex') || _.isEmpty(req.body.sex)) return next(createError.BadRequest(errors.SEX_MISSING))
  if (!_.has(req, 'body.pseudo') || _.isEmpty(req.body.pseudo)) return next(createError.BadRequest(errors.PSEUDO_MISSING))

  let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.connection.remoteAddress
  if (ip === '::1' || ip === '127.0.0.1') ip = process.env.PUBLIC_IP

  try {
    const pseudoExist = await UsersService.getByPseudo(req.body.pseudo)
    if (pseudoExist) return next(createError.BadRequest(errors.PSEUDO_EXIST))
    const emailExist = await UsersService.getByEmail(req.body.email)
    if (emailExist) return next(createError.BadRequest(errors.EMAIL_EXIST))

    const { email, password, sex, firstName, lastName, pseudo, birthday } = req.body
    const user = await UsersService.add(email, password, sex, firstName || null, lastName || null, pseudo, birthday)
    const location = await UsersService.getGeolocation(ip)

    await ProfilService.add(user, location)
    const accessToken = await AuthenticationService.buildToken(user.id)
    return res.send({ accessToken })
  } catch (err) {
    if (err) return next(err)
  }
}

const login = async (req, res, next) => {
  try {
    if (!_.has(req, 'body.password') || _.isEmpty(req.body.password)) return next(createError.BadRequest(errors.PASSWORD_MISSING))
    if (!_.has(req, 'body.pseudo') || _.isEmpty(req.body.pseudo)) return next(createError.BadRequest(errors.PSEUDO_MISSING))

    const user = await UsersService.getPassword(req.body.pseudo)
    if (!user) return next(createError.BadRequest(errors.LOGIN_UNKNOWN_PSEUDO))

    const isValidPassword = await AuthenticationService.validatePassword(req.body.password, user.password)
    if (!isValidPassword) return next(createError.BadRequest(errors.LOGIN_BAD_PASSWORD))
    const location = await UsersService.getGeolocation(req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.connection.remoteAddress)
    await ProfilService.updateLocation(location, user.id)
    const accessToken = await AuthenticationService.buildToken(user.id)
    return res.send({ accessToken })
  } catch (err) {
    if (err) return next(err)
  }
}

module.exports = {
  signup,
  login
}

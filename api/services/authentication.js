const fs = require('fs')
const jwt = require('jsonwebtoken')
const path = require('path')
const bcrypt = require('bcrypt')
const createError = require('http-errors')
const errors = require('../errors')

const validatePassword = (receivedPassword, userPassword) => {
  if (!receivedPassword || !userPassword) return Promise.resolve(false)
  return bcrypt.compare(receivedPassword, userPassword)
  .then((isValid) => isValid)
  .catch((err) => err)
}

const buildToken = (userId) => {
  return jwt.sign(
    {userId: userId.toString()},
    fs.readFileSync(path.join(__dirname, '../config/secret.key'))
  )
}

const buildJwtMiddleware = (validateToken) => {
  return (req, res, next) => {
    if (!req.headers.authorization) return next(createError.Unauthorized(errors.TOKEN_NOT_PROVIDED))

    const bearerHeader = req.headers.authorization.split(' ')
    if (bearerHeader.length !== 2 || bearerHeader[0].toLowerCase() !== 'bearer') return next(createError.Unauthorized(errors.TOKEN_INVALID))
    jwt.verify(bearerHeader[1], fs.readFileSync(path.join(__dirname, '../config/secret.key')), (err, decoded) => {
      if (err || !validateToken(decoded)) return next(createError.Unauthorized(errors.TOKEN_INVALID))
      req.token = decoded
      return next()
    })
  }
}

const userJwt = buildJwtMiddleware((token) => token.userId !== undefined)

module.exports = {
  validatePassword,
  buildToken,
  userJwt
}

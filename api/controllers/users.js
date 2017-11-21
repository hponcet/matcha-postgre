const createError = require('http-errors')

const UsersService = require('../services/users')
const errors = require('../errors')

const getUser = (req, res, next) => {
  UsersService.getById(req.token.userId)
  .then((user) => {
    if (!user) return next(createError.Unauthorized(errors.ACCOUNT_NOT_FOUND))
    UsersService.getGeolocation(req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.connection.remoteAddress)
    .then((location) => {
      user.location = location
      res.send({ data: user })
    })
    .catch(() => res.send({ data: user }))
  })
  .catch(next)
}

module.exports = {
  getUser
}

const createError = require('http-errors')
const errors = require('../errors')

const MongoClient = require('mongodb').MongoClient
const dbParams = require('../config/config').DATABASE
const dbUrl = `${dbParams.dialect}://${dbParams.host}:${dbParams.port}/${dbParams.database}`
const mongoSettings = require('../config/config').DATABASE.settings

const UsersService = require('../services/users')

const getUser = (req, res, next) => {
  return MongoClient.connect(dbUrl, mongoSettings, (err, client) => {
    if (err) return next(err)
    const db = client.db(dbParams.database)
    UsersService.getById(db, req.token.userId)
    .then((user) => {
      if (!user) return next(createError.Unauthorized(errors.ACCOUNT_NOT_FOUND))
      res.send({ data: user })
    })
    .catch(next)
  })
}

module.exports = {
  getUser
}

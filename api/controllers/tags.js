const createError = require('http-errors')
const _ = require('lodash')

const MongoClient = require('mongodb').MongoClient
const dbParams = require('../config/config').DATABASE
const dbUrl = `${dbParams.dialect}://${dbParams.host}:${dbParams.port}/${dbParams.database}`
const mongoSettings = require('../config/config').DATABASE.settings
const ValidateObjectId = /^[0-9a-fA-F]{24}$/

const TagsService = require('../services/tags')
const errors = require('../errors')

const getTags = (req, res, next) => {
  return MongoClient.connect(dbUrl, mongoSettings, (err, client) => {
    if (err) return next(err)
    const db = client.db(dbParams.database)
    return TagsService.getTags(db)
    .then((tags) => res.send(tags))
    .catch(next)
  })
}
const updateTag = (req, res, next) => {
  return MongoClient.connect(dbUrl, mongoSettings, (err, client) => {
    if (err) return next(err)
    const db = client.db(dbParams.database)
    if (!_.has(req, 'body.name') || _.isEmpty(req.body.name)) return next(createError.BadRequest(errors.BAD_TAG_ID))
    if (!_.has(req, 'body.id') || _.isEmpty(req.body.id) || !ValidateObjectId.test(req.body.id)) return next(createError.BadRequest(errors.BAD_USER_ID))

    return TagsService.updateTag(db, req.body.name, req.body.id)
    .then(res.status(200).send())
    .catch(next)
  })
}
const removeTag = (req, res, next) => {
  return MongoClient.connect(dbUrl, mongoSettings, (err, client) => {
    if (err) return next(err)
    const db = client.db(dbParams.database)
    if (!_.has(req, 'body.name') || _.isEmpty(req.body.name)) return next(createError.BadRequest(errors.BAD_TAG_NAME))
    if (!_.has(req, 'body.id') || _.isEmpty(req.body.id) || !ValidateObjectId.test(req.body.id)) return next(createError.BadRequest(errors.BAD_TAG_ID))

    return TagsService.removeTag(db, req.body.name, req.body.id)
    .then(res.status(200).send())
    .catch(next)
  })
}
const addTag = (req, res, next) => {
  return MongoClient.connect(dbUrl, mongoSettings, (err, client) => {
    if (err) return next(err)
    const db = client.db(dbParams.database)
    if (!_.has(req, 'body.id') || !_.has(req, 'body.name') ||
    _.isEmpty(req.body.id) || _.isEmpty(req.body.name)) return next(createError.BadRequest(errors.BAD_TAG_SIGNATURE))
    if (!ValidateObjectId.test(req.body.id)) return next(createError.BadRequest(errors.BAD_USER_ID))

    return TagsService.addTag(db, req.body.name, req.body.id)
    .then(res.status(200).send())
    .catch(next)
  })
}

module.exports = {
  getTags,
  updateTag,
  removeTag,
  addTag
}

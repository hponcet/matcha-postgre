const createError = require('http-errors')
const _ = require('lodash')

const ValidateObjectId = /^[0-9a-fA-F]{24}$/

const TagsService = require('../services/tags')
const errors = require('../errors')

const getTags = (req, res, next) => {
  TagsService.getTags()
  .then((tags) => res.send(tags))
}
const updateTag = (req, res, next) => {
  if (!_.has(req, 'body.name') || _.isEmpty(req.body.name)) return next(createError.BadRequest(errors.BAD_TAG_ID))
  if (!_.has(req, 'body.id') || _.isEmpty(req.body.id) || !ValidateObjectId.test(req.body.id)) return next(createError.BadRequest(errors.BAD_USER_ID))
  console.log(req.body)
  
  TagsService.updateTag(req.body.name, req.body.id)
  .catch(next)
}
const removeTag = (req, res, next) => {
  if (!_.has(req, 'body.name') || _.isEmpty(req.body.name)) return next(createError.BadRequest(errors.BAD_TAG_NAME))
  if (!_.has(req, 'body.id') || _.isEmpty(req.body.id) || !ValidateObjectId.test(req.body.id)) return next(createError.BadRequest(errors.BAD_TAG_ID))
  TagsService.removeTag(req.body.name, req.body.id)
  .catch(next)
}
const addTag = (req, res, next) => {
  if (!_.has(req, 'body.id') || !_.has(req, 'body.name') ||
  _.isEmpty(req.body.id) || _.isEmpty(req.body.name)) return next(createError.BadRequest(errors.BAD_TAG_SIGNATURE))
  if (!ValidateObjectId.test(req.body.id)) return next(createError.BadRequest(errors.BAD_USER_ID))
  TagsService.addTag(req.body.name, req.body.id)
  .catch(next)
}

module.exports = {
  getTags,
  updateTag,
  removeTag,
  addTag
}

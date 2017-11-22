const createError = require('http-errors')
const _ = require('lodash')

const ValidateObjectId = /^[0-9a-fA-F]{24}$/
const ValidateTagName = /[^A-Za-z]/

const TagsService = require('../services/tags')
const errors = require('../errors')

const getTags = (req, res, next) => {
  TagsService.getTags()
  .then((tags) => res.send(tags))
}
const updateTag = (req, res, next) => {
  if (!_.has(req, 'body.tagName') || _.isEmpty(req.body.tagName) || !ValidateTagName.test(req.body.tagName)) return next(createError.BadRequest(errors.BAD_TAG_NAME))
  if (!_.has(req, 'body.id') || _.isEmpty(req.body.id) || !ValidateObjectId.test(req.body.id)) return next(createError.BadRequest(errors.BAD_TAG_ID))

  TagsService.updateTag(req.body.tagName, req.body.id)
  .catch(next)
}
const removeTag = (req, res, next) => {
  if (!_.has(req, 'body.tagName') || _.isEmpty(req.body.tagName) || !ValidateTagName.test(req.body.tagName)) return next(createError.BadRequest(errors.BAD_TAG_NAME))
  if (!_.has(req, 'body.id') || _.isEmpty(req.body.id) || !ValidateObjectId.test(req.body.id)) return next(createError.BadRequest(errors.BAD_TAG_ID))

  TagsService.removeTag(req.body.tagName, req.body.id)
  .catch(next)
}
const addTag = (req, res, next) => {
  console.log(req.body.id)
  if (!_.has(req, 'body.id') || !_.has(req, 'body.name') ||
  _.isEmpty(req.body.id) || _.isEmpty(req.body.name) ||
  !ValidateObjectId.test(req.body.id) || !ValidateTagName.test(req.body.name)) return next(createError.BadRequest(errors.BAD_TAG_SIGNATURE))
  console.log('tata')
  TagsService.addTag(req.body.tag)
  .catch(next)
}

module.exports = {
  getTags,
  updateTag,
  removeTag,
  addTag
}

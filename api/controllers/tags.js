const createError = require('http-errors')
const _ = require('lodash')

const ValidateObjectId = /^[0-9a-fA-F]{24}$/

const TagsService = require('../services/tags')
const ProfilService = require('../services/profil')
const errors = require('../errors')

const getTags = async (req, res, next) => {
  try {
    const tags = await TagsService.getTags()
    return res.send(tags)
  } catch (err) {
    return next(err)
  }
}

const removeTag = async (req, res, next) => {
  try {
    if (!_.has(req, 'body.name') || _.isEmpty(req.body.name)) return next(createError.BadRequest(errors.BAD_TAG_NAME))
    if (!_.has(req, 'body.id') || _.isEmpty(req.body.id) || !ValidateObjectId.test(req.body.id)) return next(createError.BadRequest(errors.BAD_TAG_ID))

    const tagName = req.body.name
    const userId = req.body.id
    await ProfilService.removeTag(tagName)
    const tagId = await TagsService.getTagByName(tagName)
    await TagsService.removeTag(tagId, userId)
    return res.status(200).send()
  } catch (err) {
    return next(err)
  }
}

const addTag = async (req, res, next) => {
  try {
    if (!_.has(req, 'body.id') || !_.has(req, 'body.name') ||
    _.isEmpty(req.body.id) || _.isEmpty(req.body.name)) return next(createError.BadRequest(errors.BAD_TAG_SIGNATURE))
    if (!ValidateObjectId.test(req.body.id)) return next(createError.BadRequest(errors.BAD_USER_ID))

    const tagName = req.body.name
    const userId = req.body.id
    console.log(tagName, userId)

    await ProfilService.addTag(tagName)
    const tagId = await TagsService.getTagByName(tagName)
    if (tagId) {
      await TagsService.updateTag(tagId, userId)
      res.status(200).send()
    }
    await TagsService.addTag(tagName, userId)
    res.status(200).send()
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  getTags,
  removeTag,
  addTag
}

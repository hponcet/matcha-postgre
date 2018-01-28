const createError = require('http-errors')
const _ = require('lodash')

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
  if (!_.has(req, 'body.name') || _.isEmpty(req.body.name)) {
    return next(createError.BadRequest(errors.BAD_TAG_SIGNATURE))
  }

  try {
    const tagName = req.body.name
    const userId = req.token.userId

    await ProfilService.removeTag(tagName, userId)
    const tag = await TagsService.getTagByName(tagName)
    await TagsService.removeTag(tag.id, userId)
    return res.status(200).send()
  } catch (err) {
    return next(err)
  }
}

const addTag = async (req, res, next) => {
  if (!_.has(req, 'body.name') || _.isEmpty(req.body.name)) {
    return next(createError.BadRequest(errors.BAD_TAG_SIGNATURE))
  }

  try {
    const tagName = req.body.name
    const userId = req.token.userId

    await ProfilService.addTag(tagName, userId)
    const tag = await TagsService.getTagByName(tagName)
    if (tag) {
      await TagsService.updateTag(tag.id, userId)
      return res.status(200).send()
    }
    await TagsService.addTag(tagName, userId)
    return res.status(200).send()
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  getTags,
  removeTag,
  addTag
}

const createError = require('http-errors')
const errors = require('../errors')
const db = require('../db')

const getTags = async () => {
  const query = `
    SELECT ARRAY(SELECT "name"
    FROM tags)`
  try {
    const tags = await db.query(query)
    return tags.rows[0].array
  } catch (err) {
    console.log(err.stack)
    throw createError.BadRequest(errors.INTRNAL_ERROR)
  }
}

const getTagByName = async (tagName) => {
  const query = `
    SELECT *
    FROM tags
    WHERE name = $1`
  const values = [tagName]
  try {
    const tags = await db.query(query, values)
    return tags.rows[0]
  } catch (err) {
    console.log(err.stack)
    throw createError.BadRequest(errors.INTRNAL_ERROR)
  }
}

const updateTag = async (tagId, userId) => {
  const query = `
    UPDATE tags
    SET "ids" = array_append(ids, $2)
    WHERE "id" = $1`
  const values = [tagId, userId]
  try {
    return await db.query(query, values)
  } catch (err) {
    console.log(err.stack)
    throw createError.BadRequest(errors.INTRNAL_ERROR)
  }
}

const removeTag = async (tagId, userId) => {
  const query = `
    UPDATE tags
    SET ids = array_remove(ids, $2)
    WHERE "id" = $1`
  const values = [tagId, userId]
  try {
    return await db.query(query, values)
  } catch (err) {
    console.log(err.stack)
    throw createError.BadRequest(errors.INTRNAL_ERROR)
  }
}

const addTag = async (tagName, userId) => {
  try {
    const query = `
      INSERT INTO tags("name", "ids")
      VALUES($1, ARRAY[$2])`
    const values = [tagName, userId]
    return await db.query(query, values)
  } catch (err) {
    console.log(err.stack)
    throw createError.BadRequest(errors.INTRNAL_ERROR)
  }
}

module.exports = {
  getTags,
  getTagByName,
  updateTag,
  removeTag,
  addTag
}

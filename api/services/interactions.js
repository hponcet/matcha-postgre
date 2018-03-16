const createError = require('http-errors')
const errors = require('../errors')
const db = require('../db')

const getLikes = async (id, profilId) => {
  const query = `
    SELECT
    (
      SELECT "chatId"
      FROM "matchs"
      WHERE "id" = $1 AND "matchedId" = $2
      OR "id" = $2 AND "matchedId" = $1
    ) AS "chatId",
    (
      SELECT "likedId"
      FROM "likes"
      WHERE "id" = $1 AND "likedId" = $2
    ) AS "liked"`
  const values = [id, profilId]

  try {
    const value = await db.query(query, values)
    return value.rows[0]
  } catch (err) {
    console.log(err.stack)
    throw createError.InternalServerError(errors.INTRNAL_ERROR)
  }
}

const getLike = async (userId, likedId) => {
  const query = `
    SELECT *
    FROM "likes"
    WHERE "id" = $1 AND "likedId" = $2
    OR "likedId" = $1 AND "id" = $2`
  const values = [userId, likedId]

  try {
    const value = await db.query(query, values)
    return value.rows[0]
  } catch (err) {
    console.log(err.stack)
    throw createError.InternalServerError(errors.INTRNAL_ERROR)
  }
}

const getMatch = async (userId, likedId) => {
  const query = `
    SELECT *
    FROM "matchs"
    WHERE "id" = $1 AND "matchedId" = $2
    OR "matchedId" = $1 AND "id" = $2`
  const values = [userId, likedId]

  try {
    const value = await db.query(query, values)
    return value.rows[0]
  } catch (err) {
    console.log(err.stack)
    throw createError.InternalServerError(errors.INTRNAL_ERROR)
  }
}

const like = async (userId, likedId) => {
  const query = `
    INSERT INTO
    "likes" ("id", "likedId")
    VALUES ($1, $2)
  `
  const values = [userId, likedId]

  try {
    return await db.query(query, values)
  } catch (err) {
    console.log(err.stack)
    throw createError.InternalServerError(errors.INTRNAL_ERROR)
  }
}

const match = async (userId, matchedId, chatId) => {
  const query = `
    INSERT INTO
    "matchs" ("id", "matchedId", "chatId")
    VALUES ($1, $2, $3)
  `
  const values = [userId, matchedId, chatId]

  try {
    return await db.query(query, values)
  } catch (err) {
    console.log(err.stack)
    throw createError.InternalServerError(errors.INTRNAL_ERROR)
  }
}

module.exports = {
  like,
  match,
  getMatch,
  getLike,
  getLikes
}

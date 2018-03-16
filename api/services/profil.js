const createError = require('http-errors')
const errors = require('../errors')
const config = require('../config/config')
const db = require('../db')
const sql = require('./SQLQueries')('result')

const getProfilById = async (userId) => {
  try {
    const query = `
      SELECT *,
      ${sql.addRow.score()} AS score,
      ${sql.addRow.pictures()} AS pictures
      FROM profils AS result
      WHERE id = $1`
    const values = [userId]
    const profil = await db.query(query, values)
    if (!profil.rows[0]) throw createError.BadRequest(errors.BAD_PROFIL_REQUEST)
    return profil.rows[0]
  } catch (err) {
    console.log(err.stack)
    throw err
  }
}

const updateLocation = async (location, id) => {
  if (!location) throw Promise.reject(createError.BadRequest(errors.SERVICE_LOCATION_ERROR))
  const query = `
    UPDATE profils
    SET "location" = $1
    WHERE "id" = $2`
  const values = [location, id]
  try {
    return await db.query(query, values)
  } catch (err) {
    console.log(err.stack)
    throw createError.BadRequest(errors.SERVICE_LOCATION_ERROR)
  }
}

const getDistances = async (userId, searchedProfil) => {
  try {
    const query = `
      SELECT
      ${sql.addRow.distances(searchedProfil.location.loc)} AS "distance"
      FROM profils AS result
      WHERE id = $1`
    const values = [userId]
    const distance = await db.query(query, values)
    return distance.rows[0]
  } catch (err) {
    console.log(err.stack)
    throw err
  }
}

const updateProfil = async (name, value, userId) => {
  const query = `
    UPDATE profils
    SET "${name}" = $1
    WHERE id = $2`
  const values = [value, userId]

  try {
    const value = await db.query(query, values)
    return value.rows[0]
  } catch (err) {
    console.log(err.stack)
    throw createError.InternalServerError(errors.INTRNAL_ERROR)
  }
}

const addTag = async (tagName, userId) => {
  const query = `
    UPDATE profils
    SET "tags" = array_append(tags, $1)
    WHERE id = $2`
  const values = [tagName, userId]
  const tags = await getTags(userId)
  if (tags.indexOf(tagName) > -1) return
  try {
    return await db.query(query, values)
  } catch (err) {
    console.log(err.stack)
    throw createError.BadRequest(errors.INTRNAL_ERROR)
  }
}

const removeTag = async (tagName, userId) => {
  const query = `
    UPDATE profils
    SET "tags" = array_remove(tags, $1)
    WHERE id = $2`
  const values = [tagName, userId]
  try {
    return await db.query(query, values)
  } catch (err) {
    console.log(err.stack)
    throw createError.BadRequest(errors.INTRNAL_ERROR)
  }
}

const getTags = async (id) => {
  const query = 'SELECT "tags" FROM "profils" WHERE "id" = $1'
  const values = [id]

  try {
    const value = await db.query(query, values)
    return value.rows[0].tags
  } catch (err) {
    console.log(err.stack)
    throw createError.InternalServerError(errors.INTRNAL_ERROR)
  }
}

const getProfilPicture = async (id) => {
  const query = 'SELECT "profilPicture" FROM "profils" WHERE "id" = $1'
  const values = [id]

  try {
    const value = await db.query(query, values)
    return value.rows[0]
  } catch (err) {
    console.log(err.stack)
    throw createError.InternalServerError(errors.INTRNAL_ERROR)
  }
}

const add = async (user, location) => {
  const query = `
    INSERT INTO
    profils("tags", "sex", "pseudo", "location", "birthday", "orientation", "biography", "profilPicture", "id")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)`
  const values = [
    [],
    user.sex,
    user.pseudo,
    location,
    new Date(user.birthday),
    '3',
    '',
    `${config.HOST}:${config.PORT}/files/assets/empty_avatar.jpg`,
    user.id
  ]

  try {
    const value = await db.query(query, values)
    return value.rows[0]
  } catch (err) {
    console.log(err.stack)
    throw createError.BadRequest(errors.PROFIL_VALIDATION_ERROR)
  }
}

const getPublicProfil = async (userId, searchedId) => {
  try {
    const query = `
      SELECT *,
      ${sql.addRow.score()} AS score,
      ${sql.addRow.pictures()} AS pictures,
      ${sql.addRow.chatId(userId, searchedId)} AS "chatId",
      ${sql.addRow.isLiked(userId, searchedId)} AS "liked"
      FROM profils AS result
      WHERE id = $1`
    const values = [searchedId]
    const profil = await db.query(query, values)
    if (!profil.rows[0]) throw createError.BadRequest(errors.BAD_PROFIL_REQUEST)
    return profil.rows[0]
  } catch (err) {
    console.log(err.stack)
    throw err
  }
}

module.exports = {
  add,
  getProfilById,
  getPublicProfil,
  updateLocation,
  updateProfil,
  getProfilPicture,
  addTag,
  removeTag,
  getTags,
  getDistances
}

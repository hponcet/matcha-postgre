const db = require('../db/')
const createError = require('http-errors')
const errors = require('../errors')

const addPicture = async (localPath, publicPath, userId) => {
  const query = `
    INSERT INTO
    pictures (local_path, public_path, id)
    VALUES ($1, $2, $3)`
  const values = [localPath, publicPath, userId]
  try {
    return await db.query(query, values)
  } catch (err) {
    console.log(err.stack)
    throw createError.BadRequest(errors.INTRNAL_ERROR)
  }
}

const removePicture = async (id) => {
  const query = `
    DELETE FROM pictures
    WHERE picture_id = $1`
  const values = [id]
  try {
    return await db.query(query, values)
  } catch (err) {
    console.log(err.stack)
    throw createError.BadRequest(errors.INTRNAL_ERROR)
  }
}

const getPicture = async (id) => {
  const query = `
    SELECT *
    FROM pictures
    WHERE picture_id = $1`
  const values = [id]

  try {
    const value = await db.query(query, values)
    return value.rows[0]
  } catch (err) {
    console.log(err.stack)
    throw createError.InternalServerError(errors.INTRNAL_ERROR)
  }
}

const getPictures = async (id) => {
  const query = `
    SELECT public_path "url", picture_id "id"
    FROM pictures
    WHERE id = $1`
  const values = [id]

  try {
    const value = await db.query(query, values)
    return value.rows
  } catch (err) {
    console.log(err.stack)
    throw createError.InternalServerError(errors.INTRNAL_ERROR)
  }
}

const updateProfilPicture = async (pictureUrl, userId) => {
  const query = `
    UPDATE profils
    SET "profilPicture" = $1
    WHERE id = $2`
  const values = [pictureUrl, userId]
  try {
    return await db.query(query, values)
  } catch (err) {
    console.log(err.stack)
    throw createError.BadRequest(errors.INTRNAL_ERROR)
  }
}

module.exports = {
  addPicture,
  getPicture,
  getPictures,
  removePicture,
  updateProfilPicture
}

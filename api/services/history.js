const db = require('../db')
const createError = require('http-errors')
const errors = require('../errors')

const addNews = async (id, n) => {
  const query = `
    INSERT INTO
    history ("id", "type", "actionUrl", "profilUrl", "profilPicture", "pseudo", "message", "date")
    VALUES ($1, $2, $3, $4, $5, $6, $7, now())`
  const values = [
    n.id,
    n.type,
    n.actionUrl,
    n.profilUrl,
    n.profilPicture,
    n.pseudo,
    n.message
  ]
  try {
    await db.query(query, values)
  } catch (err) {
    console.log(err.stack)
    throw createError.InternalServerError(errors.INTRNAL_ERROR)
  }
}

const getHistory = async (id, status) => {
  const query = `
    SELECT "newsId", "type", "actionUrl", "profilUrl", "pseudo", "message", "date",
    (
      SELECT "profilPicture"
      FROM "profils"
      WHERE "pseudo" = result.pseudo
    ) AS "profilPicture"
    FROM history AS result
    WHERE id = $1
    ${
      status === 'NOTIFICATION' ? `AND "status" = 'NOTIFICATION'`
      : status === 'ARCHIVED' ? `AND "status" = 'ARCHIVED'`
      : ``
    }
  `
  const values = [id]
  try {
    const history = await db.query(query, values)
    return history.rows
  } catch (err) {
    console.log(err.stack)
    throw createError.InternalServerError(errors.INTRNAL_ERROR)
  }
}

const archiveNotification = async (profilId, newsId) => {
  const query = `
    UPDATE history
    SET status = 'ARCHIVED'
    WHERE "newsId" = $1 AND "id" = $2
  `
  const values = [newsId, profilId]
  try {
    const history = await db.query(query, values)
    return history.rows[0]
  } catch (err) {
    console.log(err.stack)
    throw createError.InternalServerError(errors.INTRNAL_ERROR)
  }
}

const archiveAllNotifications = async (profilId) => {
  const query = `
    UPDATE history
    SET status = 'ARCHIVED'
    WHERE "id" = $1
  `
  const values = [profilId]
  try {
    const history = await db.query(query, values)
    return history.rows[0]
  } catch (err) {
    console.log(err.stack)
    throw createError.InternalServerError(errors.INTRNAL_ERROR)
  }
}

module.exports = {
  archiveNotification,
  archiveAllNotifications,
  addNews,
  getHistory
}

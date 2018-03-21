const createError = require('http-errors')
const errors = require('../errors')
const db = require('../db')

const createNewChat = async (userId, likedId) => {
  const query = `
    INSERT INTO
    "chats" ("profilId1", "profilId2")
    VALUES ($1, $2)
    RETURNING "id"
  `
  const values = [userId, likedId]

  try {
    const chatId = await db.query(query, values)
    return chatId.rows[0].id
  } catch (err) {
    console.log(err.stack)
    throw createError.InternalServerError(errors.INTRNAL_ERROR)
  }
}

const getThreads = async (userId) => {
  const query = `
  SELECT *
  FROM (
    SELECT
      "id" AS "chatId",
      (
        SELECT "profilPicture"
        FROM "profils"
        WHERE id = result."profilId2"
      ) AS "profilPicture",
      (
        SELECT "pseudo"
        FROM "profils"
        WHERE id = result."profilId2"
      ) AS pseudo,
      (
        SELECT "id"
        FROM "profils"
        WHERE id = result."profilId2"
      ) AS id,
      (
        SELECT message
        FROM "messages"
        WHERE "chatId" = result."id"
        ORDER BY date DESC
        LIMIT 1
      ) AS "lastMessage",
      (
        SELECT "date"
        FROM "messages"
        WHERE "chatId" = result."id"
        ORDER BY date DESC
        LIMIT 1
      ) AS "lastDateMessage",
      (
        SELECT "id"
        FROM "messages"
        WHERE "chatId" = result."id"
        ORDER BY date DESC
        LIMIT 1
      ) AS "lastMessageUserId"
    FROM "chats" AS result
    WHERE "profilId1" = $1
    UNION
    SELECT
      "id" AS "chatId",
      (
        SELECT "profilPicture"
        FROM "profils"
        WHERE id = result."profilId1"
      ) AS "profilPicture",
      (
        SELECT "pseudo"
        FROM "profils"
        WHERE id = result."profilId1"
      ) AS pseudo,
      (
        SELECT "id"
        FROM "profils"
        WHERE id = result."profilId1"
      ) AS id,
      (
        SELECT message
        FROM "messages"
        WHERE "chatId" = result."id"
        ORDER BY date DESC
        LIMIT 1
      ) AS "lastMessage",
      (
        SELECT "date"
        FROM "messages"
        WHERE "chatId" = result."id"
        ORDER BY date DESC
        LIMIT 1
      ) AS "lastDateMessage",
      (
        SELECT "id"
        FROM "messages"
        WHERE "chatId" = result."id"
        ORDER BY date DESC
        LIMIT 1
      ) AS "lastMessageUserId"
    FROM "chats" AS result
    WHERE "profilId2" = $1
  ) AS request
  ORDER BY request."lastDateMessage" DESC
  `
  const values = [userId]

  try {
    const threads = await db.query(query, values)
    return threads.rows
  } catch (err) {
    console.log(err.stack)
    throw createError.InternalServerError(errors.INTRNAL_ERROR)
  }
}

const getThread = async (chatId) => {
  const query = `
    SELECT *
    FROM messages
    WHERE "chatId" = $1
  `
  const values = [chatId]

  try {
    const threads = await db.query(query, values)
    return threads.rows
  } catch (err) {
    console.log(err.stack)
    throw createError.InternalServerError(errors.INTRNAL_ERROR)
  }
}

const addMessage = async (userId, message) => {
  try {
    const query = `
      INSERT INTO
      messages ("chatId", "id", "message", "date")
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `
    const values = [
      message.chatId,
      userId,
      message.message,
      new Date(message.date)
    ]

    const dbMessage = await db.query(query, values)
    return dbMessage.rows[0]
  } catch (err) {
    console.log(err.stack)
    throw createError.InternalServerError(errors.INTRNAL_ERROR)
  }
}

module.exports = {
  createNewChat,
  getThreads,
  getThread,
  addMessage
}

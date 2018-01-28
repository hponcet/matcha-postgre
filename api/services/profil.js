const createError = require('http-errors')
const errors = require('../errors')
const config = require('../config/config')
const db = require('../db')

const picturesService = require('./pictures')

// const getProfilByUserId = async (userId) => {
//   return new Promise((resolve, reject) => {
//     const Profils = db.collection('profils')
//     return Profils.findOne({userId: ObjectID(userId)}, (err, data) => {
//       if (err) return reject(err)
//       return resolve(data)
//     })
//   })
// }

// const getProfilPartByUserId = async (userId, fields) => {
//   return new Promise((resolve, reject) => {
//     const Profils = db.collection('profils')
//     return Profils.findOne({userId: ObjectID(userId)}, {fields: fields}, (err, data) => {
//       if (err) return reject(err)
//       return resolve(data)
//     })
//   })
// }

const getProfilById = async (userId) => {
  const query = `
    SELECT *
    FROM profils
    WHERE id = $1`
  const values = [userId]
  try {
    const profilRaw = await db.query(query, values)
    const profil = profilRaw.rows[0]
    profil.pictures = await picturesService.getPictures(userId)
    return profil
  } catch (err) {
    console.log(err.stack)
    throw createError.BadRequest(errors.INTRNAL_ERROR)
  }
}

// const getProfilPartById = async (profilId, fields) => {
//   return new Promise((resolve, reject) => {
//     const Profils = db.collection('profils')
//     return Profils.findOne({_id: ObjectID(profilId)}, {fields: fields}, (err, data) => {
//       if (err) return reject(err)
//       return resolve(data)
//     })
//   })
// }

// const getParsedProfilById = async (profilId) => {
//   return getProfilPartById(db, profilId, {
//     tags: 1,
//     sex: 1,
//     pseudo: 1,
//     location: 1,
//     birthday: 1,
//     orientation: 1,
//     biography: 1,
//     pictures: 1,
//     profilPicture: 1,
//     userId: 1
//   })
//   .then((profil) => {
//     profil.pictures = profil.pictures.map((picture) => picture.picturePublicPath)
//     return profil
//   })
//   .catch(err => err)
// }

// const getProfilLocation = async (userId) => {
//   return new Promise((resolve, reject) => {
//     getProfilByUserId(db, userId)
//     .then((profil) => {
//       if (!profil || !profil.location || !profil.location.loc) {
//         return reject(createError.BadRequest(errors.EMPTY_LOCATION))
//       }
//       return resolve(profil.location.loc)
//     }).catch(reject)
//   })
// }

const updateLocation = async (location, id) => {
  if (!location) throw Promise.reject(createError.BadRequest(errors.SERVICE_LOCATION_ERROR))
  const query = `
    UPDATE
    profils
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

const updateProfil = async (name, value, userId) => {
  const query = `UPDATE profils SET "${name}" = $1 WHERE id = $2`
  const values = [value, userId]

  try {
    const value = await db.query(query, values)
    return value.rows[0]
  } catch (err) {
    throw createError.InternalServerError(errors.INTRNAL_ERROR)
  }
}

// const addLike = async (userProfilId, profilId) => {
//   return new Promise((resolve, reject) => {
//     const Profils = db.collection('profils')
//     Profils.findOneAndUpdate(
//       {_id: ObjectID(userProfilId)},
//       {$push: {likes: profilId}},
//       (err) => {
//         if (err) return reject(err)
//         return resolve()
//       }
//     )
//   })
// }

// const addMatch = async (userProfilId, profilId, chatId) => {
//   return new Promise((resolve, reject) => {
//     const Profils = db.collection('profils')
//     Profils.findOneAndUpdate(
//       {_id: ObjectID(userProfilId)},
//       {$push: {matchs: {chatId, profilId: profilId}}},
//       (err) => {
//         if (err) return reject(err)
//         return resolve()
//       }
//     )
//   })
// }

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

const getLikes = async (id) => {
  const query = 'SELECT "likes" FROM "profils" WHERE "id" = $1'
  const values = [id]

  try {
    const value = await db.query(query, values)
    return value.rows[0]
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
    profils("tags", "sex", "pseudo", "location", "birthday", "orientation", "biography", "pictures", "profilPicture", "matchs", "history", "likes", "id")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11::jsonb, $12, $13)`
  const values = [
    [],
    user.sex,
    user.pseudo,
    location,
    new Date(user.birthday),
    '3',
    '',
    [],
    `${config.HOST}:${config.PORT}/files/assets/empty_avatar.jpg`,
    [],
    JSON.stringify({news: [], archived: []}),
    [],
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

module.exports = {
  add,
//   getProfilPartByUserId,
//   getProfilByUserId,
  getProfilById,
//   getProfilPartById,
//   getParsedProfilByUserId,
  updateLocation,
  getLikes,
  updateProfil,
//   getProfilLocation,
//   addLike,
//   addMatch,
  getProfilPicture,
  addTag,
  removeTag,
  getTags
}

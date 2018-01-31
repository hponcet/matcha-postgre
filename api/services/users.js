const errors = require('../errors')
const axios = require('axios')
const bcrypt = require('bcrypt')
const createError = require('http-errors')
const db = require('../db')

const add = async (email, password, sex, firstName, lastName, pseudo, birthday) => {
  try {
    const query = `
      INSERT INTO
      users ("email", "password", "sex", "birthday", "firstname", "lastname", "pseudo")
      VALUES ($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
      `
    const values = [email, bcrypt.hashSync(password, 10), sex, new Date(birthday), firstName, lastName, pseudo]
    const value = await db.query(query, values)
    return value.rows[0]
  } catch (err) {
    console.log(err.stack)
    throw createError.BadRequest(errors.USER_VALIDATION_ERROR)
  }
}

// const deleteUser = async (userId) => {
//   return new Promise((resolve, reject) => {
//     Users.deleteOne({_id: ObjectID(userId)}, (err) => {
//       if (err) return reject(err)
//       return resolve()
//     })
//   })
// }

// const insertProfilId = async (userId, profilId) => {
//   return new Promise((resolve, reject) => {
//     Users.findOneAndUpdate({_id: ObjectID(userId)}, {$set: {profilId}}, (err, data) => {
//       if (err) return reject(err)
//       return resolve(data)
//     })
//   })
// }

const getById = async (id) => {
  const query = 'SELECT * FROM users WHERE "id" = $1'
  const values = [id]

  try {
    const value = await db.query(query, values)
    return value.rows[0]
  } catch (err) {
    console.log(err.stack)
    throw createError.InternalServerError(errors.INTRNAL_ERROR)
  }
}

const getByPseudo = async (pseudo) => {
  const query = 'SELECT * FROM users WHERE "pseudo" = $1'
  const values = [pseudo]

  try {
    const value = await db.query(query, values)
    return value.rows[0]
  } catch (err) {
    console.log(err.stack)
    throw createError.InternalServerError(errors.INTRNAL_ERROR)
  }
}

const getByEmail = async (email) => {
  const query = 'SELECT * FROM users WHERE "email" = $1'
  const values = [email]

  try {
    const value = await db.query(query, values)
    return value.rows[0]
  } catch (err) {
    console.log(err.stack)
    throw createError.InternalServerError(errors.INTRNAL_ERROR)
  }
}

const getPassword = async (pseudo) => {
  const query = 'SELECT "password", "id" FROM users WHERE "pseudo" = $1'
  const values = [pseudo]

  try {
    const value = await db.query(query, values)
    return value.rows[0]
  } catch (err) {
    console.log(err.stack)
    throw createError.InternalServerError(errors.INTRNAL_ERROR)
  }
}

const updateUser = async (name, value, userId) => {
  const query = `UPDATE users SET "${name}" = $1 WHERE "id" = $2`
  const values = [value, userId]

  try {
    const value = await db.query(query, values)
    return value.rows[0]
  } catch (err) {
    console.log(err.stack)
    throw createError.InternalServerError(errors.INTRNAL_ERROR)
  }
}

const getGeolocation = (ip) => {
  const userIp = (ip === '::1' || ip === '127.0.0.1' || ip === '::ffff:127.0.0.1') ? process.env.PUBLIC_IP : ip
  return new Promise((resolve, reject) => {
    return axios({
      method: 'get',
      url: `https://ipinfo.io/${userIp}/json`
    })
    .then((geoData) => {
      const { city, region, country, postal, loc } = geoData.data
      if (!loc) throw reject(createError.BadRequest(errors.CANT_GET_LOCATION))
      const location = loc.split(',')
      const floatLocation = {
        type: 'Point',
        coordinates: [
          parseFloat(location[0]),
          parseFloat(location[1])
        ]
      }
      if (location.length !== 2) throw reject(createError.InternalServerError(errors.BAD_LOCATION_FROM_API))
      const userLocation = {
        ip: userIp,
        city: city || '',
        region: region || '',
        country: country || '',
        zip: postal || '',
        loc: floatLocation
      }
      return resolve(userLocation)
    })
    .catch((err) => {
      console.log(err)
      throw reject(createError.InternalServerError(errors.API_SERVICE_LOCATION_ERROR))
    })
  })
}

module.exports = {
  add,
  // deleteUser,
  getById,
  getByPseudo,
  getPassword,
  getByEmail,
  getGeolocation,
  updateUser
  // insertProfilId
}

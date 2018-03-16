const db = require('../db')
const createError = require('http-errors')
const errors = require('../errors')
const profilRequests = require('./profilRequests')

const purposedProfils = async (...props) => {
  const { query, values } = profilRequests.purposedProfils(...props)

  try {
    const profils = await db.query(query, values)
    return profils.rows
  } catch (err) {
    console.log(err.stack)
    throw createError.InternalServerError(errors.INTRNAL_ERROR)
  }
}

const searchProfils = async ({profil, order, offset, rangeDistance, tags, age}) => {
  try {
    const { query, values } = profilRequests.searchProfils({profil, order, offset, rangeDistance, tags, age})
    const profils = await db.query(query, values)
    return profils.rows
  } catch (err) {
    console.log(err.stack)
    throw createError.InternalServerError(errors.INTRNAL_ERROR)
  }
}
module.exports = {
  searchProfils,
  purposedProfils
}

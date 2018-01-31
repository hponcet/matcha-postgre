const db = require('../db')
const createError = require('http-errors')
const errors = require('../errors')
const profilRequests = require('./profilRequests')

const find = async ({profilId, location, distance, ageRange, tags, orientation}) => {
  const query = profilRequests.queryConstructor({profilId, location, distance, ageRange, tags, orientation})

  try {
    const profils = await db.query(query)
    // profils.rows.map((profil) => console.log(profil.tagsIntersect))
    return profils.rows
  } catch (err) {
    console.log(err.stack)
    throw createError.InternalServerError(errors.INTRNAL_ERROR)
  }
}

const purposedProfils = async (profil) => {
  const query = profilRequests.queryConstructor(profil)

  try {
    const profils = await db.query(query)
    return profils
  } catch (err) {
    return err
  }
}

const searchProfils = async (profil, distance, tags, ageRange) => {
  try {
    const profils = await find({
      location: profil.location.loc,
      orientation: profil.orientation,
      profilId: profil.id,
      distance,
      ageRange,
      tags
    })
    return profils
  } catch (err) {
    return err
  }
}

module.exports = {
  searchProfils,
  purposedProfils
}

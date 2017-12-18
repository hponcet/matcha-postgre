const MongoClient = require('mongodb').MongoClient
const dbParams = require('../config/config').DATABASE

const ProfilService = require('../services/profil')

const dbUrl = `${dbParams.dialect}://${dbParams.host}:${dbParams.port}/${dbParams.database}`

const findByKm = (originePoint, distance, userId, limit) => {
  if (!distance) distance = 1000
  return new Promise((resolve, reject) => {
    MongoClient.connect(dbUrl)
    .then((db) => {
      const Profils = db.collection('profils')
      Profils.find({
        'location.loc': {
          $near: {
            $geometry: {
              type: 'Point',
              coordinates: originePoint
            },
            $maxDistance: distance * 1000
          }
        }
      }).limit(limit || 48).toArray((err, matchedProfils) => {
        if (err) return reject(err)
        return resolve(matchedProfils)
      })
      db.close()
    })
    .catch(err => reject(err))
  })
}

const getProfils = (userId) => {
  return ProfilService.getProfilLocation(userId)
  .then((location) => findByKm(location, null, userId)
  .then((profils) => {
    return profils
  })
  .catch(err => err))
  .catch(err => err)
}

module.exports = {
  getProfils
}

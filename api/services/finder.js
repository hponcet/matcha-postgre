const MongoClient = require('mongodb').MongoClient
const dbParams = require('../config/config').DATABASE

const ProfilService = require('../services/profil')

const dbUrl = `${dbParams.dialect}://${dbParams.host}:${dbParams.port}/${dbParams.database}`

const distanceQuery = (coordinates, distance) => {
  return {
    $geoNear: {
      near: { type: 'Point', coordinates },
      distanceField: 'location.loc',
      maxDistance: distance * 1000,
      spherical: true
    }
  }
}

const matchAgeRangeQuery = (ageRange) => {
  return {
    $match: {
      birthday: { $lt: new Date(ageRange.min), $gt: new Date(ageRange.max) }
    }
  }
}

const matchTagsQuery = (tags) => {
  return { $match: { tags: { $in: tags } }
  }
}

const queryConstructor = (originePoint, distance, userId, limit, ageRange, tags) => {
  const query = []

  if (originePoint) query.push(distanceQuery(originePoint, distance))
  if (ageRange) query.push(matchAgeRangeQuery(ageRange))
  if (tags && tags.length > 0) query.push(matchTagsQuery(tags))
  console.table(query)
  return query
}

const find = (originePoint, distance, userId, limit, ageRange, tags) => {
  if (!distance) distance = 1000
  return new Promise((resolve, reject) => {
    MongoClient.connect(dbUrl)
    .then((db) => {
      db.collection('profils')
      .aggregate(queryConstructor(originePoint, distance, userId, limit, ageRange, tags))
      .limit(limit || 48)
      .toArray((err, matchedProfils) => {
        db.close()
        if (err) return reject(err)
        return resolve(matchedProfils)
      })
    })
    .catch(err => reject(err))
  })
}

const getProfils = (userId) => {
  return ProfilService.getProfilLocation(userId)
  .then((location) => find(location, null, userId)
  .then((profils) => profils)
  .catch(err => err))
  .catch(err => err)
}

const searchProfils = (userId, distance, tags, ageRange) => {
  return ProfilService.getProfilLocation(userId)
  .then((location) => find(location, distance, userId, null, ageRange, tags)
  .then((profils) => profils)
  .catch(err => err))
  .catch(err => err)
}

module.exports = {
  getProfils,
  searchProfils
}

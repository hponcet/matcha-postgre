const ObjectID = require('mongodb').ObjectID

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
  return { $match: { birthday: { $lt: new Date(ageRange.min), $gt: new Date(ageRange.max) } } }
}
const matchTagsQuery = (tags, sex) => {
  return { $match: { tags: { $in: tags } } }
}
const matchOrientationQuery = (sex) => {
  return { $match: { sex: sex } }
}

const queryConstructor = ({profilId, location, distance, ageRange, tags, orientation}) => {
  const query = []

  if (location) query.push(distanceQuery(location, distance))
  if (ageRange) query.push(matchAgeRangeQuery(ageRange))
  if (tags && tags.length > 0) query.push(matchTagsQuery(tags))
  if (orientation !== '3') query.push(matchOrientationQuery(orientation))
  if (profilId) query.push({$match: { _id: { $not: { $eq: ObjectID(profilId) } } }})
  if (profilId) query.push({$match: { pictures: { $exists: true, $ne: [] } }})

  return query
}

const find = ({db, profilId, location, distance, ageRange, limit, tags, orientation}) => {
  if (!distance) distance = 1000
  return new Promise((resolve, reject) => {
    db.collection('profils')
    .aggregate(queryConstructor({profilId, location, distance, ageRange, tags, orientation}))
    .limit(limit || 48)
    .toArray((err, matchedProfils) => {
      if (err) return reject(err)
      return resolve(matchedProfils)
    })
  })
}

const searchProfils = ({db, profil, distance, tags, ageRange}) => {
  return find({
    db,
    location: profil.location.loc,
    orientation: profil.orientation,
    profilId: profil._id,
    distance,
    ageRange,
    tags
  })
  .then((profils) => profils)
  .catch(err => err)
}

module.exports = {
  searchProfils
}

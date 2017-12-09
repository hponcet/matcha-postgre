const MongoClient = require('mongodb').MongoClient
const dbParams = require('../config/config').DATABASE

const dbUrl = `${dbParams.dialect}://${dbParams.host}:${dbParams.port}/${dbParams.database}`

const findByLatLng = (coordinates, callback) => {
  return MongoClient.connect(dbUrl)
  .then((db) => {
    const Profils = db.collection('locations')
    const query = {
      'geometry': {
        '$geoIntersects': {
          '$geometry': {
            type: 'geometry',
            coordinates: [coordinates[1], coordinates[0]]
          }
        }
      }
    }
    return Profils.findOne(query, callback)
    .then(data => data)
    .catch(err => err)
  })
  .catch(err => err)
}

module.exports = {
  findByLatLng
}

const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const createError = require('http-errors')
const errors = require('../errors')

const dbParams = require('../config/config').DATABASE
const dbUrl = `${dbParams.dialect}://${dbParams.host}:${dbParams.port}/${dbParams.database}`

const getProfil = (userId) => {
  return MongoClient.connect(dbUrl).then(db => {
    const Profils = db.collection('profils')
    return Profils.findOne({userId: ObjectID(userId)})
    .then(data => data)
    .catch(err => err)
  })
  .catch(err => err)
}

const getProfilLocation = (userId) => {
  return getProfil(userId)
  .then((profil) => {
    if (!profil || !profil.location || !profil.location.loc) return Promise.reject(createError.BadRequest(errors.EMPTY_LOCATION))
    return profil.location.loc
  })
}

const updateLocation = (location, userId) => {
  return MongoClient.connect(dbUrl).then(db => {
    const Profils = db.collection('profils')
    return Profils.findOneAndUpdate({userId: ObjectID(userId)}, {$set: {location}})
    .then(data => data)
    .catch(err => err)
  })
  .catch(err => err)
}

const updateField = (name, value, userId) => {
  return MongoClient.connect(dbUrl).then(db => {
    const Profils = db.collection('profils')
    return Profils.findOneAndUpdate({userId: ObjectID(userId)}, {$set: {[name]: value}})
    .then(() => db.close())
    .catch(err => err)
  })
  .catch(err => err)
}

const add = (user, location) => {
  return new Promise((resolve, reject) => {
    return MongoClient.connect(dbUrl)
    .then((db) => {
      const Profils = db.collection('profils')
      const profil = {
        tags: [],
        sex: user.sex,
        pseudo: user.pseudo,
        location,
        birthday: new Date(user.birthday),
        orientation: '3',
        biography: '',
        pictures: [],
        profilPicture: null,
        userId: user._id,
        profilScore: 100,
        consultedBy: [],
        likes: []
      }
      return Profils.insertOne(profil)
      .then((data) => resolve(data.ops[0]))
      .catch(err => {
        if (err.code === 121) return reject(createError.BadRequest(errors.PROFIL_VALIDATION_ERROR))
        return reject(err)
      })
    })
    .catch(err => reject(err))
  })
}

module.exports = {
  add,
  getProfil,
  updateLocation,
  updateField,
  getProfilLocation
}

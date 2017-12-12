const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID

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

const updateLocation = (location, userId) => {
  return MongoClient.connect(dbUrl).then(db => {
    const Profils = db.collection('profils')
    return Profils.findOneAndUpdate({userId: ObjectID(userId)}, {$set: {location}})
    .then(data => data)
    .catch(err => err)
  })
  .catch(err => err)
}

const newProfil = (user) => {
  return MongoClient.connect(dbUrl)
  .then((db) => {
    const Profil = db.collection('profils')
    const profil = {
      tags: [],
      sex: user.sex,
      pseudo: user.pseudo,
      location: user.location,
      birthday: user.birthday,
      orientation: '3',
      biography: '',
      pictures: [],
      profilPicture: null,
      userId: user._id,
      profilScore: 100,
      consultedBy: [],
      likes: []
    }
    return Profil.insertOne(profil)
    .then((data) => data.ops[0]._id)
    .catch(err => err)
  })
  .catch(err => err)
}

module.exports = {
  newProfil,
  getProfil,
  updateLocation
}

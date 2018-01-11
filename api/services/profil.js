const ObjectID = require('mongodb').ObjectID
const createError = require('http-errors')
const errors = require('../errors')
const config = require('../config/config')

const getProfilByUserId = (db, userId) => {
  return new Promise((resolve, reject) => {
    const Profils = db.collection('profils')
    return Profils.findOne({userId: ObjectID(userId)}, (err, data) => {
      if (err) return reject(err)
      return resolve(data)
    })
  })
}

const getProfilPartByUserId = (db, userId, fields) => {
  return new Promise((resolve, reject) => {
    const Profils = db.collection('profils')
    return Profils.findOne({userId: ObjectID(userId)}, {fields: fields}, (err, data) => {
      if (err) return reject(err)
      return resolve(data)
    })
  })
}

const getProfilById = (db, profilId) => {
  return new Promise((resolve, reject) => {
    const Profils = db.collection('profils')
    return Profils.findOne({_id: ObjectID(profilId)}, (err, data) => {
      if (err) return reject(err)
      return resolve(data)
    })
  })
}

const getProfilPartById = (db, profilId, fields) => {
  return new Promise((resolve, reject) => {
    const Profils = db.collection('profils')
    return Profils.findOne({_id: ObjectID(profilId)}, {fields: fields}, (err, data) => {
      if (err) return reject(err)
      return resolve(data)
    })
  })
}

const getParsedProfilByUserId = (db, userId) => {
  return getProfilPartByUserId(db, userId, {
    tags: 1,
    sex: 1,
    pseudo: 1,
    location: 1,
    birthday: 1,
    orientation: 1,
    biography: 1,
    pictures: 1,
    profilPicture: 1,
    userId: 1
  })
  .then((profil) => {
    profil.pictures = profil.pictures.map((picture) => picture.picturePublicPath)
    return profil
  })
  .catch(err => err)
}

const getParsedProfilById = (db, profilId) => {
  return getProfilPartById(db, profilId, {
    tags: 1,
    sex: 1,
    pseudo: 1,
    location: 1,
    birthday: 1,
    orientation: 1,
    biography: 1,
    pictures: 1,
    profilPicture: 1,
    userId: 1
  })
  .then((profil) => {
    profil.pictures = profil.pictures.map((picture) => picture.picturePublicPath)
    return profil
  })
  .catch(err => err)
}

const getProfilLocation = (db, userId) => {
  return new Promise((resolve, reject) => {
    getProfilByUserId(db, userId)
    .then((profil) => {
      if (!profil || !profil.location || !profil.location.loc) {
        return reject(createError.BadRequest(errors.EMPTY_LOCATION))
      }
      return resolve(profil.location.loc)
    }).catch(reject)
  })
}

const updateLocation = (db, location, userId) => {
  return new Promise((resolve, reject) => {
    const Profils = db.collection('profils')
    Profils.findOneAndUpdate({userId: ObjectID(userId)}, {$set: {location}}, (err, data) => {
      if (err) return reject(err)
      return resolve(data)
    })
  })
}

const updateField = (db, name, value, userId) => {
  return new Promise((resolve, reject) => {
    const Profils = db.collection('profils')
    return Profils.findOneAndUpdate({userId: ObjectID(userId)}, {$set: {[name]: value}}, (err) => {
      if (err) return reject(err)
      return resolve()
    })
  })
}

const addLike = (db, userProfilId, profilId) => {
  return new Promise((resolve, reject) => {
    const Profils = db.collection('profils')
    Profils.findOneAndUpdate(
      {_id: ObjectID(userProfilId)},
      {$push: {likes: profilId}},
      (err) => {
        if (err) return reject(err)
        return resolve()
      }
    )
  })
}

const addMatch = (db, userProfilId, profilId, chatId) => {
  return new Promise((resolve, reject) => {
    const Profils = db.collection('profils')
    Profils.findOneAndUpdate(
      {_id: ObjectID(userProfilId)},
      {$push: {matchs: {chatId, profilId: profilId}}},
      (err) => {
        if (err) return reject(err)
        return resolve()
      }
    )
  })
}

const add = (db, user, location) => {
  return new Promise((resolve, reject) => {
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
      profilPicture: `${config.HOST}:${config.PORT}/files/assets/empty_avatar.jpg`,
      userId: user._id,
      matchs: [],
      history: {
        news: [],
        archived: []
      },
      likes: []
    }
    return Profils.insertOne(profil, (err, data) => {
      if (err) {
        if (err.code === 121) return reject(createError.BadRequest(errors.PROFIL_VALIDATION_ERROR))
        return reject(err)
      }
      return resolve(data)
    })
  })
}

module.exports = {
  add,
  getProfilPartByUserId,
  getProfilByUserId,
  getProfilById,
  getProfilPartById,
  getParsedProfilByUserId,
  getParsedProfilById,
  updateLocation,
  updateField,
  getProfilLocation,
  addLike,
  addMatch
}

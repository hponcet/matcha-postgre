const errors = require('../errors')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const axios = require('axios')
const bcrypt = require('bcrypt')
const createError = require('http-errors')

const dbParams = require('../config/config').DATABASE
const dbUrl = `${dbParams.dialect}://${dbParams.host}:${dbParams.port}/${dbParams.database}`

const add = (email, password, sex, firstName, lastName, pseudo, birthday) => {
  return new Promise((resolve, reject) => {
    return MongoClient.connect(dbUrl)
    .then((db) => {
      const Users = db.collection('users')
      return bcrypt.hash(password, 10)
      .then((hash) => {
        const user = {
          email,
          password: hash,
          sex,
          birthday: new Date(birthday),
          firstName,
          lastName,
          pseudo,
          profilId: null
        }
        return Users.insertOne(user)
        .then((data) => resolve(data.ops[0]))
        .catch(err => {
          if (err.code === 121) return reject(createError.BadRequest(errors.USER_VALIDATION_ERROR))
          return reject(err)
        })
      })
      .catch(err => reject(err))
    })
    .catch(err => reject(err))
  })
}

const deleteUser = (userId) => {
  return MongoClient.connect(dbUrl)
  .then(db => {
    const Users = db.collection('users')
    return Users.deleteOne({_id: ObjectID(userId)})
    .then(() => db.close())
    .catch(err => err)
  })
  .catch(err => err)
}

const insertProfilId = (userId, profilId) => {
  return MongoClient.connect(dbUrl)
  .then(db => {
    const Users = db.collection('users')
    return Users.findOneAndUpdate({_id: ObjectID(userId)}, {$set: {profilId}})
    .then((data) => {
      db.close()
      return data
    })
    .catch(err => err)
  })
  .catch(err => err)
}

const getByPseudo = (pseudo) => {
  return MongoClient.connect(dbUrl)
  .then((db) => {
    const Users = db.collection('users')
    return Users.findOne({pseudo}, {fields: {password: 0}})
    .then((user) => user)
    .catch(err => err)
  })
  .catch(err => err)
}

const getPassword = (pseudo) => {
  return MongoClient.connect(dbUrl)
  .then((db) => {
    const Users = db.collection('users')
    return Users.findOne({pseudo}, {fields: {password: 1}})
    .then((user) => user)
    .catch(err => err)
  })
  .catch(err => err)
}

const getByMail = (email) => {
  return MongoClient.connect(dbUrl)
  .then((db) => {
    const Users = db.collection('users')
    return Users.findOne({email})
    .then((user) => user)
    .catch(err => err)
  })
  .catch(err => err)
}

const getById = (userId) => {
  return MongoClient.connect(dbUrl)
  .then((db) => {
    const Users = db.collection('users')
    return Users.findOne({_id: ObjectID(userId)})
    .then((user) => user)
    .catch(err => err)
  })
  .catch(err => err)
}

const updateField = (name, value, userId) => {
  return MongoClient.connect(dbUrl)
  .then(db => {
    const Users = db.collection('users')
    return Users.findOneAndUpdate({_id: ObjectID(userId)}, {$set: {[name]: value}})
    .then((data) => {
      db.close()
      return data
    })
    .catch(err => err)
  })
  .catch(err => err)
}

const getGeolocation = (ip) => {
  const userIp = (ip === '::1' || ip === '127.0.0.1') ? process.env.PUBLIC_IP : ip
  return new Promise((resolve, reject) => {
    return axios({
      method: 'get',
      url: `https://ipinfo.io/${userIp}/json`
    })
    .then((geoData) => {
      const { city, region, country, postal, loc } = geoData.data
      if (!loc) return reject(createError.BadRequest(errors.CANT_GET_LOCATION))
      const location = loc.split(',')
      const floatLocation = [parseFloat(location[0]), parseFloat(location[1])]
      if (location.length !== 2) return reject(createError.InternalServerError(errors.BAD_LOCATION_FROM_API))
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
    .catch(() => reject(createError.InternalServerError(errors.API_SERVICE_LOCATION_ERROR)))
  })
}

module.exports = {
  add,
  deleteUser,
  getById,
  getByPseudo,
  getPassword,
  getByMail,
  getGeolocation,
  updateField,
  insertProfilId
}

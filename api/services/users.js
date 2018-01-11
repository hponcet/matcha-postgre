const errors = require('../errors')
const ObjectID = require('mongodb').ObjectID
const axios = require('axios')
const bcrypt = require('bcrypt')
const createError = require('http-errors')

const add = (db, email, password, sex, firstName, lastName, pseudo, birthday) => {
  return new Promise((resolve, reject) => {
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
    }).catch(reject)
  })
}

const deleteUser = (db, userId) => {
  return new Promise((resolve, reject) => {
    const Users = db.collection('users')
    Users.deleteOne({_id: ObjectID(userId)}, (err) => {
      if (err) return reject(err)
      return resolve()
    })
  })
}

const insertProfilId = (db, userId, profilId) => {
  return new Promise((resolve, reject) => {
    const Users = db.collection('users')
    Users.findOneAndUpdate({_id: ObjectID(userId)}, {$set: {profilId}}, (err, data) => {
      if (err) return reject(err)
      return resolve(data)
    })
  })
}

const getByPseudo = (db, pseudo) => {
  return new Promise((resolve, reject) => {
    const Users = db.collection('users')
    Users.findOne({pseudo}, {fields: {password: 0}}, (err, user) => {
      if (err) return reject(err)
      return resolve(user)
    })
  })
}

const getPassword = (db, pseudo) => {
  return new Promise((resolve, reject) => {
    const Users = db.collection('users')
    Users.findOne({pseudo}, {fields: {password: 1}}, (err, user) => {
      if (err) return reject(err)
      return resolve(user)
    })
  })
}

const getByMail = (db, email) => {
  return new Promise((resolve, reject) => {
    const Users = db.collection('users')
    Users.findOne({email}, (err, user) => {
      if (err) return reject(err)
      return resolve(user)
    })
  })
}

const getById = (db, userId) => {
  return new Promise((resolve, reject) => {
    const Users = db.collection('users')
    Users.findOne({_id: ObjectID(userId)}, (err, data) => {
      if (err) return reject(err)
      return resolve(data)
    })
  })
}

const updateField = (db, name, value, userId) => {
  return new Promise((resolve, reject) => {
    const Users = db.collection('users')
    return Users.findOneAndUpdate({_id: ObjectID(userId)}, {$set: {[name]: value}}, (err, data) => {
      if (err) return reject(err)
      return resolve(data)
    })
  })
}

const getGeolocation = (ip) => {
  const userIp = (ip === '::1' || ip === '127.0.0.1' || ip === '::ffff:127.0.0.1') ? process.env.PUBLIC_IP : ip
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
    .catch((err) => {
      console.log(err)
      return reject(createError.InternalServerError(errors.API_SERVICE_LOCATION_ERROR))
    })
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

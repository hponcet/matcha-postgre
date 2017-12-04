const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const axios = require('axios')
const bcrypt = require('bcrypt')

const dbParams = require('../config/config').DATABASE
const dbUrl = `${dbParams.dialect}://${dbParams.host}:${dbParams.port}/${dbParams.database}`
const AuthenticationService = require('./authentication')
const ProfilService = require('./profil')

const add = (email, password, sex, firstName, lastName, pseudo, birthday, location) => {
  return MongoClient.connect(dbUrl)
  .then((db) => {
    const Users = db.collection('users')
    return bcrypt.hash(password, 10)
    .then((hash) =>
    Users.insertOne({email, password: hash, sex, birthday, firstName, lastName, pseudo, profilId: null, location})
    .then((data) =>
    ProfilService.newProfil(data.ops[0]._id)
    .then((profilId) =>
    Users.updateOne({_id: data.ops[0]._id}, {$set: {profilId}}, false, true)
    .then(() => {
      db.close()
      return AuthenticationService.buildToken(data.ops[0]._id)
    })
    .catch(err => err))
    .catch(err => err))
    .catch(err => err))
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

const getGeolocation = (ip) => {
  return axios({
    method: 'get',
    url: `https://ipinfo.io/${(ip === '::1' || ip === '127.0.0.1') ? '93.26.180.80' : ip}/json`
  })
  .then((geoData) => {
    const { ip, city, region, country, postal, loc } = geoData.data
    return Promise.resolve({
      ip: ip || null,
      city: city || null,
      region: region || null,
      country: country || null,
      zip: postal || null,
      loc: loc.split(',') || null
    })
  })
  .catch((err) => console.log('[GEOLOCATION API ERROR]', err.response.data))
}

module.exports = {
  add,
  getById,
  getByPseudo,
  getPassword,
  getByMail,
  getGeolocation
}

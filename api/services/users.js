const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const axios = require('axios')

const dbParams = require('../config/config').DATABASE
const dbUrl = `${dbParams.dialect}://${dbParams.host}:${dbParams.port}/${dbParams.database}`

const requiredFields = {fields: {password: 0}}

const getByPseudo = (pseudo) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(dbUrl, (err, db) => {
      if (err) return reject(err)
      const Users = db.collection('users')
      Users.findOne({pseudo}, requiredFields, (err, data) => {
        if (err) return reject(err)
        db.close()
        resolve(data)
      })
    })
  })
}

const getByMail = (email) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(dbUrl, (err, db) => {
      if (err) return reject(err)
      const Users = db.collection('users')
      Users.findOne({email}, requiredFields, (err, data) => {
        if (err) return reject(err)
        db.close()
        resolve(data)
      })
    })
  })
}

const getById = (userId) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(dbUrl, (err, db) => {
      if (err) return reject(err)
      const Users = db.collection('users')
      Users.findOne({_id: ObjectID(userId)}, requiredFields, (err, data) => {
        if (err) return reject(err)
        db.close()
        resolve(data)
      })
    })
  })
}

const getGeolocation = (ip) => {
  return axios({
    method: 'get',
    url: `https://ipinfo.io/${(ip === '::1' || ip === '127.0.0.1') ? '93.26.180.80' : ip}/json`
  })
  .then((geoData) => {
    const { ip, city, region, country, postal, loc } = geoData.data
    return {
      ip: ip || null,
      city: city || null,
      region: region || null,
      country: country || null,
      zip: postal || null,
      loc: loc.split(',') || null
    }
  })
  .catch((err) => err)
}

module.exports = {
  getById,
  getByPseudo,
  getByMail,
  getGeolocation
}

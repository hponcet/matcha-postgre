const MongoClient = require('mongodb').MongoClient
const axios = require('axios')

const dbParams = require('../config/config').DATABASE
const dbUrl = `${dbParams.dialect}://${dbParams.host}:${dbParams.port}/${dbParams.database}`

const getByPseudo = (pseudo) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(dbUrl, (err, db) => {
      if (err) return reject(err)
      const Users = db.collection('users')
      Users.findOne({pseudo}, (err, data) => {
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
      Users.findOne({email}, (err, data) => {
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
      ip: ip,
      city: city,
      region: region,
      country: country,
      zip: postal,
      loc: loc.split(',')
    }
  })
  .catch((err) => err)
}

module.exports = {
  getByPseudo,
  getByMail,
  getGeolocation
}

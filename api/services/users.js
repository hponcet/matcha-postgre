const MongoClient = require('mongodb').MongoClient

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

module.exports = {
  getByPseudo,
  getByMail
}

const MongoClient = require('mongodb').MongoClient
const fs = require('fs')
const jwt = require('jsonwebtoken')
const path = require('path')
const bcrypt = require('bcrypt')

const dbParams = require('../config/config').DATABASE
const dbUrl = `${dbParams.dialect}://${dbParams.host}:${dbParams.port}/${dbParams.database}`

const signup = (email, password, sex, firstName, lastName, pseudo, location) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(dbUrl, (err, db) => {
      if (err) return reject(err)
      const Users = db.collection('users')
      bcrypt.hash(password, 10)
      .then((hash) => {
        Users.insertOne({email, password: hash, sex, firstName, lastName, pseudo, profil: null, location}, (err, data) => {
          if (err) return reject(err)
          db.close()
          resolve(buildToken(data.ops[0]._id))
        })
      })
    })
  })
}

const validatePassword = (receivedPassword, userPassword) => {
  return bcrypt.compare(receivedPassword, userPassword)
  .then((isValid) => isValid)
}

const buildToken = (userId) => {
  return jwt.sign(
    {userId: userId.toString()},
    fs.readFileSync(path.join(__dirname, '../config/secret.key'))
  )
}

module.exports = {
  signup,
  validatePassword,
  buildToken
}

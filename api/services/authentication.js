const MongoClient = require('mongodb').MongoClient
const fs = require('fs')
const jwt = require('jsonwebtoken')
const path = require('path')

const dbParams = require('../config/config').DATABASE
const dbUrl = `${dbParams.dialect}://${dbParams.host}:${dbParams.port}/${dbParams.database}`

const signup = (email, password, sex, firstName, lastName, pseudo) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(dbUrl, (err, db) => {
      if (err) return reject(err)
      const Users = db.collection('users')
      Users.insertOne({email, password, sex, firstName, lastName, pseudo}, (err, data) => {
        if (err) return reject(err)
        db.close()
        resolve(buildToken(data.ops[0]._id.toString()))
      })
    })
  })
}

const buildToken = (userId) => {
  return jwt.sign(
    {userId: userId.toString()},
    fs.readFileSync(path.join(__dirname, '../config/secret.key'))
  )
}

module.exports = {
  signup
}

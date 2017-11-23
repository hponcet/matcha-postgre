const MongoClient = require('mongodb').MongoClient

const dbParams = require('../config/config').DATABASE
const dbUrl = `${dbParams.dialect}://${dbParams.host}:${dbParams.port}/${dbParams.database}`

const newProfil = (userId) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(dbUrl, (err, db) => {
      if (err) return reject(err)
      const Profil = db.collection('profil')
      const profilSignature = {
        tags: [],
        sex: null,
        orientation: null,
        biography: null,
        pictures: [],
        profilPicture: null,
        userId
      }
      Profil.insertOne(profilSignature, (err, data) => {
        if (err) return reject(err)
        db.close()
        resolve(data.ops[0]._id)
      })
    })
  })
}

module.exports = {
  newProfil
}

const MongoClient = require('mongodb').MongoClient

const dbParams = require('../config/config').DATABASE
const dbUrl = `${dbParams.dialect}://${dbParams.host}:${dbParams.port}/${dbParams.database}`

const getTags = () => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(dbUrl, (err, db) => {
      if (err) return reject(err)
      const Tags = db.collection('tags')
      Tags.find().toArray((err, data) => {
        if (err) return reject(err)
        db.close()
        resolve(data)
      })
    })
  })
}

const updateTag = (tagName, id) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(dbUrl, (err, db) => {
      if (err) return reject(err)
      const Tags = db.collection('tags')
      Tags.findOneAndUpdate({name: tagName}, { $push: { ids: id } }, (err, data) => {
        if (err) return reject(err)
        db.close()
        resolve(data)
      })
    })
  })
}

const removeTag = (userId) => {

}

const addTag = (ip) => {

}

module.exports = {
  getTags,
  updateTag,
  removeTag,
  addTag
}

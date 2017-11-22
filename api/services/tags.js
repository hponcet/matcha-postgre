const MongoClient = require('mongodb').MongoClient

const dbParams = require('../config/config').DATABASE
const dbUrl = `${dbParams.dialect}://${dbParams.host}:${dbParams.port}/${dbParams.database}`

const getTags = () => {
  console.log('getTags')
  return new Promise((resolve, reject) => {
    MongoClient.connect(dbUrl, (err, db) => {
      if (err) return reject(err)
      const Tags = db.collection('tags')
      Tags.find().toArray((err, data) => {
        if (err) return reject(err)
        db.close()
        console.log(data)
        resolve(data)
      })
    })
  })
}

const updateTag = (tagName, id) => {
  console.log('updateTag')
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
  console.log('removeTag')
}

const addTag = (tag) => {
  console.log('addTag')
  return new Promise((resolve, reject) => {
    MongoClient.connect(dbUrl, (err, db) => {
      if (err) return reject(err)
      const Tags = db.collection('tags')
      Tags.insertOne({tag}, (err, data) => {
        if (err) return reject(err)
        db.close()
        console.log(data)
      })
    })
  })
}

module.exports = {
  getTags,
  updateTag,
  removeTag,
  addTag
}

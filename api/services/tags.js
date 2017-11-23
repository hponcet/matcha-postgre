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

const addUserTag = (name, id) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(dbUrl, (err, db) => {
      if (err) return reject(err)
      const Profil = db.collection('profil')
      Profil.updateOne({userId: id}, {$pull: {tags: name}}, (err) => {
        if (err) return reject(err)
        resolve()
      })
    })
  })
}

const removeUserTag = (name, id) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(dbUrl, (err, db) => {
      if (err) return reject(err)
      const Profil = db.collection('profil')
      Profil.updateOne({userId: id}, {$pull: {tags: {$in: [ name ]}}}, (err) => {
        if (err) return reject(err)
        resolve()
      })
    })
  })
}

const getTagByName = (name) => {
  return new Promise((resolve, reject) => {
    MongoClient.connect(dbUrl, (err, db) => {
      if (err) return reject(err)
      const Tags = db.collection('tags')
      Tags.findOne({name}, (err, data) => {
        if (err) return reject(err)
        if (data) return resolve(data._id)
        return resolve()
      })
    })
  })
}

const updateTag = (tagName, userId) => {
  return new Promise((resolve, reject) => {
    getTagByName(tagName)
    .then((_id) => {
      if (!_id) return addTag(tagName, userId)
      MongoClient.connect(dbUrl, (err, db) => {
        if (err) return reject(err)
        const Tags = db.collection('tags')

        Tags.findOne({_id}, {fields: {ids: 1}}, (err, data) => {
          if (err) return reject(err)
          if (data.ids.find((id) => { return (id === userId) })) return resolve()
          Tags.findOneAndUpdate({_id}, { $push: { ids: userId } }, (err, data) => {
            if (err) return reject(err)
            db.close()
            addUserTag(tagName, userId)
            return resolve(data.ops)
          })
        })
      })
    })
  })
}

const removeTag = (tagName, id) => {
  return new Promise((resolve, reject) => {
    getTagByName(tagName)
    .then((_id) => {
      if (!_id) return resolve()
      MongoClient.connect(dbUrl, (err, db) => {
        if (err) return reject(err)
        const Tags = db.collection('tags')
        Tags.updateOne({_id}, {$pull: {ids: {$in: [ id ]}}}, (err, data) => {
          if (err) return reject(err)
          removeUserTag(tagName, id)
          return resolve()
        })
      })
    })
  })
}

const addTag = (tagName, id) => {
  return new Promise((resolve, reject) => {
    getTagByName(tagName)
    .then((tagId) => {
      if (tagId) return updateTag(tagName, id)
      MongoClient.connect(dbUrl, (err, db) => {
        if (err) return reject(err)
        const Tags = db.collection('tags')
        const ids = [id]
        const tag = {name: tagName, ids}
        Tags.insertOne(tag, (err, data) => {
          if (err) return reject(err)
          db.close()
          addUserTag(tagName, id)
          return resolve()
        })
      })
    })
    .catch(err => reject(err))
  })
}

module.exports = {
  getTags,
  updateTag,
  removeTag,
  addTag
}

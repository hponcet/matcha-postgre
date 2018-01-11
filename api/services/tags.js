const ObjectID = require('mongodb').ObjectID

const getTags = (db) => {
  return new Promise((resolve, reject) => {
    const Tags = db.collection('tags')
    Tags.find().toArray((err, data) => {
      if (err) return reject(err)
      resolve(data)
    })
  })
}

const addUserTag = (db, name, id) => {
  return new Promise((resolve, reject) => {
    const Profils = db.collection('profils')
    Profils.updateOne({userId: ObjectID(id)}, {$push: {tags: name}}, (err) => {
      if (err) return reject(err)
      return resolve()
    })
  })
}

const removeUserTag = (db, name, id) => {
  return new Promise((resolve, reject) => {
    const Profils = db.collection('profils')
    Profils.updateOne({userId: ObjectID(id)}, {$pull: {tags: {$in: [ name ]}}}, (err) => {
      if (err) return reject(err)
      return resolve()
    })
  })
}

const getTagByName = (db, name) => {
  return new Promise((resolve, reject) => {
    const Tags = db.collection('tags')
    Tags.findOne({name}, (err, data) => {
      if (err) return reject(err)
      if (data) return resolve(data._id)
      return resolve()
    })
  })
}

const updateTag = (db, tagName, userId) => {
  return new Promise((resolve, reject) => {
    getTagByName(db, tagName).then((_id) => {
      if (!_id) return addTag(db, tagName, userId)
      const Tags = db.collection('tags')
      Tags.findOne({_id}, {fields: {ids: 1}}, (err, data) => {
        if (err) return reject(err)
        if (data.ids.find((id) => { return (id === userId) })) return resolve()
        Tags.findOneAndUpdate({_id}, { $push: { ids: userId } }, (err, data) => {
          if (err) return reject(err)
          addUserTag(db, tagName, userId)
          return resolve(data.ops)
        })
      })
    })
  })
}

const removeTag = (db, tagName, id) => {
  return new Promise((resolve, reject) => {
    getTagByName(db, tagName)
    .then((_id) => {
      if (!_id) return resolve()
      const Tags = db.collection('tags')
      Tags.updateOne({_id}, {$pull: {ids: {$in: [ id ]}}}, (err, data) => {
        if (err) return reject(err)
        removeUserTag(db, tagName, id)
        return resolve()
      })
    })
  })
}

const addTag = (db, tagName, id) => {
  return new Promise((resolve, reject) => {
    getTagByName(db, tagName)
    .then((tagId) => {
      if (tagId) return updateTag(db, tagName, id)
      const ids = [id]
      const tag = {name: tagName, ids}
      const Tags = db.collection('tags')
      Tags.insertOne(tag, (err, data) => {
        if (err) return reject(err)
        addUserTag(db, tagName, id)
        return resolve()
      })
    }).catch(reject)
  })
}

module.exports = {
  getTags,
  updateTag,
  removeTag,
  addTag
}

const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const fs = require('fs')

const config = require('../config/config')
const dbParams = require('../config/config').DATABASE

const dbUrl = `${dbParams.dialect}://${dbParams.host}:${dbParams.port}/${dbParams.database}`
const picturesUrl = `${config.HOST}:${config.PORT}/${config.UPLOAD_PICTURES_PATH}`

const getPictures = (userId) => {
  return MongoClient.connect(dbUrl)
  .then((db) => {
    const Profils = db.collection('profils')
    return Profils.findOne({userId: ObjectID(userId)}, {fields: {pictures: 1}})
    .then((data) => data.pictures)
    .catch(err => err)
  })
  .catch(err => err)
}

const addPicture = (picture, index, userId) => {
  return getPictures(userId)
  .then((pictures) => MongoClient.connect(dbUrl)
    .then((db) => {
      const Profils = db.collection('profils')
      const pictureLocalPath = `./${picture.path}`
      const picturePublicPath = `${picturesUrl}/${userId}/${picture.filename}`

      if (pictures[index]) fsRemovePicture(pictureLocalPath)
      pictures[index] = {picturePublicPath, pictureLocalPath}

      return Profils.findOneAndUpdate({userId: ObjectID(userId)}, {$set: {pictures}})
      .then(() => pictures.map((picture) => picture.picturePublicPath))
      .catch(err => err)
    })
    .catch(err => err)
  )
}

const removePicture = (pictureUrl, index, userId) => {
  return getPictures(userId)
  .then((pictures) => {
    return MongoClient.connect(dbUrl)
    .then((db) => {
      const Profils = db.collection('profils')

      if (pictures[index] && pictures[index].picturePublicPath !== pictureUrl) return pictures.map((picture) => picture.picturePublicPath)
      fsRemovePicture(pictures[index].pictureLocalPath)
      pictures.splice(index, 1)

      return Profils.findOneAndUpdate({userId: ObjectID(userId)}, {$set: {pictures}})
      .then(() => pictures.map((picture) => picture.picturePublicPath))
      .catch(err => err)
    })
    .catch(err => err)
  })
}

const fsRemovePicture = (picturePath) => {
  fs.unlink(picturePath, (err) => {
    if (err) return console.log(err)
  })
}

module.exports = {
  getPictures,
  addPicture,
  removePicture
}

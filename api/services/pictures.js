const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID
const fs = require('fs')

const config = require('../config/config')
const dbParams = require('../config/config').DATABASE
const dbUrl = `${dbParams.dialect}://${dbParams.host}:${dbParams.port}/${dbParams.database}`

const getPictures = (userId) => {
  return MongoClient.connect(dbUrl)
  .then((db) => {
    const Profils = db.collection('profils')
    Profils.findOne({userId: ObjectID(userId)}, {fields: {pictures: 1}})
    .then((pictures) => pictures)
    .catch(err => err)
  })
  .catch(err => err)
}

const addPicture = (pictureData, index, userId) => {
  // return getPictures(userId)
  // .then((pictures) => {
  //   return MongoClient.connect(dbUrl)
  //   .then((db) => {
  //     return fsWritePicture(pictureData, userId)
  //     .then((pictureUrl) => {
  //       if (pictures[index]) fsRemovePicture(pictures[index])
  //       pictures[index] = pictureUrl

  //       const Profils = db.collection('profils')
  //       Profils.insertOne({userId: ObjectID(userId)}, {pictures})
  //       .then((data) => data)
  //       .catch(err => err)
  //     })
  //     .catch(err => err)
  //   })
  //   .catch(err => err)
  // })
}

const removePicture = (pictureUrl, index, userId) => {
  return getPictures(userId)
  .then((pictures) => {
    return MongoClient.connect(dbUrl)
    .then((db) => {
      const Profils = db.collection('profils')
      if (pictures[index] !== pictureUrl) return Promise.reject({err: 'No picture for this url'})
      fsRemovePicture(pictures[index])
      .then(() => {
        pictures[index].splice(index, 1)
        Profils.insertOne({userId: ObjectID(userId)}, {pictures})
        .then()
        .catch(err => err)
      })
      .catch(err => err)
    })
    .catch(err => err)
  })
}

const fsWritePicture = (pictureData, userId) => {
  return new Promise((resolve, reject) => {
    const fileName = `${Buffer.from(`${Date.now()}path_to_picture${userId}`).toString('base64')}.png`
    const path = `/pictures/${userId}/${fileName}`
    fs.writeFile(path, pictureData, (err) => {
      if (err) reject(err)
      const pictureUrl = `${config.HOST}:${config.PORT}/${path}`
      resolve(pictureUrl)
    })
  })
}

const fsRemovePicture = (pictureUrl) => {
  return new Promise((resolve, reject) => {
    const parsedPath = pictureUrl.split('/')
    const pictureToRemove = `/${parsedPath[2]}/${parsedPath[3]}/${parsedPath[4]}`
    fs.unlink(pictureToRemove, (err) => {
      if (err) reject(err)
      resolve()
    })
  })
}

module.exports = {
  getPictures,
  addPicture,
  removePicture
}

const ObjectID = require('mongodb').ObjectID
// const fs = require('fs')
const config = require('../config/config')

const profilService = require('../services/profil')

const picturesUrl = `${config.HOST}:${config.PORT}/${config.UPLOAD_PICTURES_PATH}`

const addPicture = (db, picture, index, userId) => {
  return new Promise((resolve, reject) => {
    profilService.getProfilPartByUserId(db, userId, {pictures: 1})
    .then((profil) => {
      const {pictures} = profil
      const pictureLocalPath = `./${picture.path}`
      const picturePublicPath = `${picturesUrl}/${userId}/${picture.filename}`

      if (pictures[index]) fsRemovePicture(pictureLocalPath)
      pictures[index] = {picturePublicPath, pictureLocalPath}

      if (pictures.length === 1 && pictures[0]) {
        updateProfilPicture(db, pictures[0].picturePublicPath, userId)
      }

      const Profils = db.collection('profils')
      return Profils.findOneAndUpdate(
        {userId: ObjectID(userId)},
        {$set: {pictures}},
        (err) => {
          if (err) return reject(err)
          return resolve()
        }
      )
    }).catch(reject)
  })
}

const removePicture = (db, pictureUrl, index, userId) => {
  return new Promise((resolve, reject) => {
    profilService.getProfilPartByUserId(db, userId, {pictures: 1, profilPicture: 1})
    .then((profil) => {
      const {pictures, profilPicture} = profil
      if (pictures[index] && pictures[index].picturePublicPath !== pictureUrl) {
        const pictureMap = pictures.map((picture) => picture.picturePublicPath)
        return resolve(pictureMap)
      }

      fsRemovePicture(pictures[index].pictureLocalPath)
      pictures.splice(index, 1)

      // Update profilPicture if the removed picture
      // is the current picture
      if (pictures[0] && pictureUrl === profilPicture) {
        updateProfilPicture(db, pictures[0].picturePublicPath, userId)
      }

      const Profils = db.collection('profils')
      Profils.findOneAndUpdate(
        {userId: ObjectID(userId)},
        {$set: {pictures}},
        (err, data) => {
          if (err) return reject(err)
          const pictureMap = pictures.map((picture) => picture.picturePublicPath)
          return resolve(pictureMap)
        }
      )
    }).catch(reject)
  })
}

const updateProfilPicture = (db, pictureUrl, userId) => {
  return new Promise((resolve, reject) => {
    const Profils = db.collection('profils')
    return Profils.findOneAndUpdate(
      {userId: ObjectID(userId)},
      {$set: {profilPicture: pictureUrl}},
      (err, data) => {
        if (err) return reject(err)
        return resolve(pictureUrl)
      }
    )
  })
}

const fsRemovePicture = (picturePath) => {
  // fs.unlink(picturePath, (err) => {
  //   if (err) console.log('[FS ERROR]', err)
  // })
}

module.exports = {
  addPicture,
  removePicture,
  updateProfilPicture
}

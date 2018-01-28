const _ = require('lodash')
const createError = require('http-errors')
const errors = require('../errors')

const ProfilService = require('../services/profil')
// const FinderService = require('../services/finder')
const UsersService = require('../services/users')

// const ValidateObjectId = /^[0-9a-fA-F]{24}$/

const getProfil = async (req, res, next) => {
  try {
    const profil = await ProfilService.getProfilById(req.token.userId)

    let ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.connection.remoteAddress
    if (ip === '::1' || ip === '127.0.0.1') ip = process.env.PUBLIC_IP
    
    if (ip && profil && profil.location && profil.location.ip !== ip) {
      profil.location = await UsersService.getGeolocation(ip)
      await ProfilService.updateLocation(profil.location, req.token.userId)
      return res.send(profil)
    } else {
      return res.send(profil)
    }
  } catch (err) {
    return next(err)
  }
}

// const getPublicProfil = async (req, res, next) => {
//   if (!_.has(req, 'params.userId') || _.isEmpty(req.params.userId) || !ValidateObjectId.test(req.params.userId)) return next(createError.BadRequest(errors.BAD_PROFIL))
//   return MongoClient.connect(dbUrl, mongoSettings, (err, client) => {
//     if (err) return next(err)
//     const db = client.db(dbParams.database)
//     return ProfilService.getParsedProfilById(db, req.params.userId)
//     .then((profil) => res.send(profil))
//     .catch(next)
//   })
// }

const updateProfil = async (req, res, next) => {
  try {
    if (!_.has(req, 'body.profil') || _.isEmpty(req.body.profil)) return next(createError.BadRequest(errors.BAD_PROFIL))
    if (req.body.profil.length !== 6) return next(createError.BadRequest(errors.BAD_PROFIL))

    for (let index = 0; index < 6; index++) {
      const field = req.body.profil[index]
      if (field.pristine && !field.value) continue
      if (field.type === 'biography' || field.type === 'orientation') {
        await ProfilService.updateProfil(field.type, field.value, req.token.userId)
      }
      if (field.type === 'sex') {
        await ProfilService.updateProfil(field.type, field.value, req.token.userId)
        await UsersService.updateUser(field.type, field.value, req.token.userId)
      }
      if (field.type === 'firstname' || field.type === 'lastname') {
        await UsersService.updateUser(field.type, field.value, req.token.userId)
      }
      if (field.type === 'email') {
        const mailExist = await UsersService.getByEmail(field.value)
        if (mailExist) return next(createError.BadRequest(errors.EMAIL_EXIST))
        await UsersService.updateUser(field.type, field.value, req.token.userId)
      }
    }
    return res.send()
  } catch (err) {
    return next(err)
  }
}

// const getProfils = async (req, res, next) => {
//   return MongoClient.connect(dbUrl, mongoSettings, (err, client) => {
//     if (err) return next(err)
//     const db = client.db(dbParams.database)
//     return ProfilService.getProfilPartByUserId(
//       db,
//       req.token.userId,
//       {orientation: 1, 'location.loc': 1}
//     ).then((profil) => {
//       return FinderService.searchProfils({db, profil})
//       .then((profils) => {
//         if (!profils) return res.send()
//         return res.send(parseProfils(profils))
//       }).catch(next)
//     }).catch(next)
//   })
// }

// const searchProfils = async (req, res, next) => {
//   if (!_.has(req.body, 'ageRange') || _.isEmpty(req.body.ageRange) ||
//   !_.has(req.body.ageRange, 'min') || !_.has(req.body.ageRange, 'max')) {
//     return next(createError.BadRequest(errors.BAD_PROFILS_SEARCH))
//   }
//   if (!_.has(req.body, 'rangeDistance')) {
//     return next(createError.BadRequest(errors.BAD_PROFILS_SEARCH))
//   }
//   if (!_.has(req.body, 'tags')) {
//     return next(createError.BadRequest(errors.BAD_PROFILS_SEARCH))
//   }

//   const { ageRange, rangeDistance, tags } = req.body
//   const age = {
//     min: new Date(Date.now() - ageRange.min * 3.154e+10),
//     max: new Date(Date.now() - (ageRange.max + 1) * 3.154e+10)
//   }

//   return MongoClient.connect(dbUrl, mongoSettings, (err, client) => {
//     if (err) return next(err)
//     const db = client.db(dbParams.database)
//     return ProfilService.getProfilPartByUserId(
//       db,
//       req.token.userId,
//       {orientation: 1, 'location.loc': 1}
//     ).then((profil) => {
//       return FinderService.searchProfils({db, profil, rangeDistance, tags, ageRange: age})
//       .then((profils) => {
//         if (!profils) return res.send()
//         return res.send(parseProfils(profils))
//       }).catch(next)
//     }).catch(next)
//   })
// }

// const parseProfils = async (profils) => {
//   return _.map(profils, (profil) => {
//     const { biography, birthday, location, pictures, profilPicture, pseudo, _id } = profil
//     return {
//       biography,
//       birthday,
//       location,
//       pictures: _.map(pictures, (picture) => picture.picturePublicPath),
//       profilPicture,
//       pseudo,
//       _id
//     }
//   })
// }

module.exports = {
  getProfil,
  // getProfils,
  // getPublicProfil,
  updateProfil
  // searchProfils
}

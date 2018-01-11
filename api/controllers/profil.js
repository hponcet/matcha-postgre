const createError = require('http-errors')
const _ = require('lodash')

const MongoClient = require('mongodb').MongoClient
const dbParams = require('../config/config').DATABASE
const dbUrl = `${dbParams.dialect}://${dbParams.host}:${dbParams.port}/${dbParams.database}`
const mongoSettings = require('../config/config').DATABASE.settings

const ProfilService = require('../services/profil')
const FinderService = require('../services/finder')
const UsersService = require('../services/users')
const errors = require('../errors')

const ValidateObjectId = /^[0-9a-fA-F]{24}$/

const getProfil = (req, res, next) => {
  return MongoClient.connect(dbUrl, mongoSettings, (err, client) => {
    if (err) return next(err)
    const db = client.db(dbParams.database)
    return ProfilService.getProfilByUserId(db, req.token.userId)
    .then((profil) => {
      profil.pictures = profil.pictures.map((picture) => picture.picturePublicPath)

      let receivedIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.connection.remoteAddress
      if (receivedIp === '::1' || receivedIp === '127.0.0.1') receivedIp = process.env.PUBLIC_IP
      if (receivedIp && profil && profil.location && profil.location.ip !== receivedIp) {
        return UsersService.getGeolocation(receivedIp)
        .then((location) => {
          profil.location = location
          console.log('yolo')
          return ProfilService.updateLocation(db, location, req.token.userId)
          .then(() => res.send(profil))
          .catch(next)
        }).catch(next)
      } else {
        res.send(profil)
      }
    })
    .catch(next)
  })
}

const getPublicProfil = (req, res, next) => {
  if (!_.has(req, 'params.userId') || _.isEmpty(req.params.userId) || !ValidateObjectId.test(req.params.userId)) return next(createError.BadRequest(errors.BAD_PROFIL))
  return MongoClient.connect(dbUrl, mongoSettings, (err, client) => {
    if (err) return next(err)
    const db = client.db(dbParams.database)
    return ProfilService.getParsedProfilById(db, req.params.userId)
    .then((profil) => res.send(profil))
    .catch(next)
  })
}

const updateProfil = async (req, res, next) => {
  if (!_.has(req, 'body.profil') || _.isEmpty(req.body.profil)) return next(createError.BadRequest(errors.BAD_PROFIL))
  if (req.body.profil.length !== 6) return next(createError.BadRequest(errors.BAD_PROFIL))

  return Promise.all(_.map(req.body.profil, (input) => {
    return MongoClient.connect(dbUrl, mongoSettings, (err, client) => {
      if (err) return next(err)
      const db = client.db(dbParams.database)
      return new Promise((resolve, reject) => {
        if (!_.has(input, 'type') || _.isEmpty(input.type)) return reject(next(createError.BadRequest(errors.BAD_PROFIL)))
        if (!_.has(input, 'pristine')) return reject(next(createError.BadRequest(errors.BAD_PROFIL)))
        if (input.pristine) return resolve()
        if (!_.has(input, 'value')) return reject(next(createError.BadRequest(errors.BAD_PROFIL)))

        switch (input.type) {
          case 'sex':
            return ProfilService.updateField(db, input.type, input.value, req.token.userId).then(resolve).catch(reject)
          case 'orientation':
            return ProfilService.updateField(db, input.type, input.value, req.token.userId).then(resolve).catch(reject)
          case 'biography':
            return ProfilService.updateField(db, input.type, input.value, req.token.userId).then(resolve).catch(reject)
          case 'firstName':
            return UsersService.updateField(db, input.type, input.value, req.token.userId).then(resolve).catch(reject)
          case 'lastName':
            return UsersService.updateField(db, input.type, input.value, req.token.userId).then(resolve).catch(reject)
          case 'email':
            return UsersService.getByMail(db, input.value)
            .then((mailExist) => mailExist
              ? reject(next(createError.BadRequest(errors.EMAIL_EXIST)))
              : UsersService.updateField(db, input.type, input.value, req.token.userId).then(resolve)
              .catch(reject))
            .catch(reject)
          default:
            return resolve()
        }
      })
    })
  }))
  .then(() => res.send())
  .catch(next)
}

const getProfils = (req, res, next) => {
  return MongoClient.connect(dbUrl, mongoSettings, (err, client) => {
    if (err) return next(err)
    const db = client.db(dbParams.database)
    return ProfilService.getProfilPartByUserId(
      db,
      req.token.userId,
      {orientation: 1, 'location.loc': 1}
    ).then((profil) => {
      return FinderService.searchProfils({db, profil})
      .then((profils) => {
        if (!profils) return res.send()
        return res.send(parseProfils(profils))
      }).catch(next)
    }).catch(next)
  })
}

const searchProfils = (req, res, next) => {
  if (!_.has(req.body, 'ageRange') || _.isEmpty(req.body.ageRange) ||
  !_.has(req.body.ageRange, 'min') || !_.has(req.body.ageRange, 'max')) {
    return next(createError.BadRequest(errors.BAD_PROFILS_SEARCH))
  }
  if (!_.has(req.body, 'rangeDistance')) {
    return next(createError.BadRequest(errors.BAD_PROFILS_SEARCH))
  }
  if (!_.has(req.body, 'tags')) {
    return next(createError.BadRequest(errors.BAD_PROFILS_SEARCH))
  }

  const { ageRange, rangeDistance, tags } = req.body
  const age = {
    min: new Date(Date.now() - ageRange.min * 3.154e+10),
    max: new Date(Date.now() - (ageRange.max + 1) * 3.154e+10)
  }

  return MongoClient.connect(dbUrl, mongoSettings, (err, client) => {
    if (err) return next(err)
    const db = client.db(dbParams.database)
    return ProfilService.getProfilPartByUserId(
      db,
      req.token.userId,
      {orientation: 1, 'location.loc': 1}
    ).then((profil) => {
      return FinderService.searchProfils({db, profil, rangeDistance, tags, ageRange: age})
      .then((profils) => {
        if (!profils) return res.send()
        return res.send(parseProfils(profils))
      }).catch(next)
    }).catch(next)
  })
}

const parseProfils = (profils) => {
  return _.map(profils, (profil) => {
    const { biography, birthday, location, pictures, profilPicture, pseudo, _id } = profil
    return {
      biography,
      birthday,
      location,
      pictures: _.map(pictures, (picture) => picture.picturePublicPath),
      profilPicture,
      pseudo,
      _id
    }
  })
}

module.exports = {
  getProfil,
  getProfils,
  getPublicProfil,
  updateProfil,
  searchProfils
}

const createError = require('http-errors')
const _ = require('lodash')

const ProfilService = require('../services/profil')
const FinderService = require('../services/finder')
const UsersService = require('../services/users')
const errors = require('../errors')

const getProfil = (req, res, next) => {
  return ProfilService.getProfil(req.token.userId)
  .then((profil) => {
    let receivedIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress || req.connection.remoteAddress
    if (receivedIp === '::1' || receivedIp === '127.0.0.1') receivedIp = process.env.PUBLIC_IP
    if (receivedIp && profil.location.ip !== receivedIp) {
      return UsersService.getGeolocation(receivedIp)
      .then((location) => {
        profil.location = location
        return ProfilService.updateLocation(location, req.token.userId)
        .then(() => res.send(profil))
        .catch(next)
      })
      .catch(next)
    } else {
      res.send(profil)
    }
  })
  .catch(next)
}

const updateProfil = async (req, res, next) => {
  if (!_.has(req, 'body.profil') || _.isEmpty(req.body.profil)) return next(createError.BadRequest(errors.BAD_PROFIL))
  if (req.body.profil.length !== 6) return next(createError.BadRequest(errors.BAD_PROFIL))

  return Promise.all(_.map(req.body.profil, (input) => {
    return new Promise((resolve, reject) => {
      if (!_.has(input, 'type') || _.isEmpty(input.type)) return reject(next(createError.BadRequest(errors.BAD_PROFIL)))
      if (!_.has(input, 'pristine')) return reject(next(createError.BadRequest(errors.BAD_PROFIL)))
      if (input.pristine) return resolve()
      if (!_.has(input, 'value')) return reject(next(createError.BadRequest(errors.BAD_PROFIL)))

      switch (input.type) {
        case 'sex':
          return ProfilService.updateField(input.type, input.value, req.token.userId)
          .then(() => resolve()).catch(err => reject(err))
        case 'orientation':
          return ProfilService.updateField(input.type, input.value, req.token.userId)
          .then(() => resolve()).catch(err => reject(err))
        case 'biography':
          return ProfilService.updateField(input.type, input.value, req.token.userId)
          .then(() => resolve()).catch(err => reject(err))
        case 'firstName':
          return UsersService.updateField(input.type, input.value, req.token.userId)
          .then(() => resolve()).catch(err => reject(err))
        case 'lastName':
          return UsersService.updateField(input.type, input.value, req.token.userId)
          .then(() => resolve()).catch(err => reject(err))
        case 'email':
          return UsersService.getByMail(input.value)
          .then((mailExist) => mailExist
            ? reject(next(createError.BadRequest(errors.EMAIL_EXIST)))
            : UsersService.updateField(input.type, input.value, req.token.userId).then((data) => resolve('ok'))
          .catch(err => reject(err)))
        default:
          return resolve()
      }
    })
  }))
  .then(() => res.status(200).send())
  .catch(next)
}

const getProfils = (req, res, next) => {
  return FinderService.getProfils(req.token.userId)
  .then((profils) => {
    const userProfil = _.map(profils, (profil) => {
      const { biography, birthday, location, pictures, profilPicture, profilScore, pseudo, userId, _id } = profil
      return {
        biography,
        birthday,
        location,
        pictures: _.map(pictures, (picture) => picture.picturePublicPath),
        profilPicture,
        profilScore,
        pseudo,
        userId,
        _id
      }
    })
    return res.send(userProfil)
  })
  .catch(next)
}

const searchProfils = (req, res, next) => {
  if (!_.has(req.body, 'ageRange') || _.isEmpty(req.body.ageRange) ||
  !_.has(req.body.ageRange, 'min') || !_.has(req.body.ageRange, 'max')) return next(createError.BadRequest(errors.BAD_PROFILS_SEARCH))
  if (!_.has(req.body, 'rangeDistance')) return next(createError.BadRequest(errors.BAD_PROFILS_SEARCH))
  if (!_.has(req.body, 'tags')) return next(createError.BadRequest(errors.BAD_PROFILS_SEARCH))

  return FinderService.searchProfils(req.token.userId)
  .then((profils) => {
    const userProfil = _.map(profils, (profil) => {
      const { biography, birthday, location, pictures, profilPicture, profilScore, pseudo, userId, _id } = profil
      return {
        biography,
        birthday,
        location,
        pictures: _.map(pictures, (picture) => picture.picturePublicPath),
        profilPicture,
        profilScore,
        pseudo,
        userId,
        _id
      }
    })
    return res.send(userProfil)
  })
  .catch(next)
}

module.exports = {
  getProfil,
  getProfils,
  updateProfil,
  searchProfils
}

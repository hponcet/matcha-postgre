const createError = require('http-errors')
const _ = require('lodash')

const ProfilService = require('../services/profil')
const UsersService = require('../services/users')
const errors = require('../errors')

const getProfil = (req, res, next) => {
  ProfilService.getProfil(req.token.userId)
  .then((profil) => res.send(profil))
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
  .then((data) => res.status(200).send())
  .catch(next)
}

module.exports = {
  getProfil,
  updateProfil
}

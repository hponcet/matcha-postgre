const _ = require('lodash')
const createError = require('http-errors')
const errors = require('../errors')

const ProfilService = require('../services/profil')
const FinderService = require('../services/finder')
const UsersService = require('../services/users')

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

const getPublicProfil = async (req, res, next) => {
  try {
    if (!_.has(req, 'params.userId') || _.isEmpty(req.params.userId)) return next(createError.BadRequest(errors.BAD_PROFIL))

    const { userId } = req.token
    const { userId: profilId } = req.params

    const profil = await ProfilService.getPublicProfil(userId, profilId)
    return res.send(profil)
  } catch (err) {
    return next(err)
  }
}

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

const searchProfils = async (req, res, next) => {
  try {
    const {userId} = req.token
    let {order, offset} = req.body
    const { ageRange, rangeDistance, tags } = req.body

    const currentDate = Date.now()
    const age = ageRange
      ? {
        min: currentDate - (ageRange.min * 3.154e+10),
        max: currentDate - ((ageRange.max + 1) * 3.154e+10)
      }
      : null

    const profil = await ProfilService.getProfilById(userId)
    let profils = await FinderService.searchProfils({profil, order, offset, rangeDistance, tags, age})
    if (profils.length === 0 && offset > 0) {
      offset = 0
      profils = await FinderService.searchProfils({profil, order, offset, rangeDistance, tags, age})
    }
    return res.send({
      data: profils,
      offset
    })
  } catch (err) {
    return next(err)
  }
}

const purposedProfils = async (req, res, next) => {
  try {
    const {userId} = req.token
    let {order, offset} = req.body

    const profil = await ProfilService.getProfilById(userId)
    let profils = await FinderService.purposedProfils(profil, order, offset)
    if (profils.length === 0 && offset > 0) {
      offset = 0
      profils = await FinderService.purposedProfils(profil, order, offset)
    }
    return res.send({
      data: profils,
      offset
    })
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  getProfil,
  getPublicProfil,
  updateProfil,
  purposedProfils,
  searchProfils
}

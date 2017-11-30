const express = require('express')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')

const controller = require('../controllers/pictures')
const userJwt = require('../services/authentication').userJwt

const middleWare = (req, res, next) => {
  fs.createWriteStream('./test.png').pipe(req)
}

router.get('/pictures', userJwt, controller.getPictures)
router.post('/pictures', userJwt, middleWare, controller.addPicture)
router.delete('/pictures', userJwt, controller.removePicture)

module.exports = router

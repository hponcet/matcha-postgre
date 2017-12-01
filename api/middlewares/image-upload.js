const multer = require('multer')
const fs = require('fs')
const path = require('path')
const config = require('../config/config')

const uploadPath = config.UPLOAD_PICTURES_PATH

const createDir = (userId) => {
  const userPath = path.join(uploadPath, userId)
  if (!fs.existsSync('files')) fs.mkdirSync('files')
  if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath)
  if (!fs.existsSync(userPath)) fs.mkdirSync(userPath)

  return userPath
}

const getRandomNumber = () => {
  const randHexString = () => Math.floor((1 + Math.random()) * 0x100000000000000).toString(16).substring(1)
  return `${randHexString()}${randHexString()}-${randHexString()}`
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, createDir(req.token.userId)),
  filename: (req, file, cb) => cb(null, `${getRandomNumber()}-${Date.now()}.png`)
})

const multerMiddleware = multer({ storage }).single('picture')

module.exports = multerMiddleware

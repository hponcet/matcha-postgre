const publicIp = require('public-ip')
const logo = require('../config/asciilogo')
const dbInit = require('./database-init')
const socketService = require('../services/socket')

const getPublicIp = () => {
  return publicIp.v4()
  .then((publicIp) => {
    process.env.PUBLIC_IP = publicIp
    return publicIp
  })
  .catch(err => err)
}

const initServer = (server) => {
  console.log(logo)
  return getPublicIp()
  .then((data) => {
    console.log('[IPv4]', data)
    return dbInit()
    .then(() => socketService.startService(server))
    .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
}

module.exports = initServer

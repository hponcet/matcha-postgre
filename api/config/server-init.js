const publicIp = require('public-ip')
const logo = require('../config/asciilogo')
const dbInit = require('./database-init')

const getPublicIp = () => {
  return publicIp.v4()
  .then((publicIp) => {
    process.env.PUBLIC_IP = publicIp
    return publicIp
  })
  .catch(err => err)
}

const initServer = () => {
  console.log(logo)
  return getPublicIp()
  .then((data) => {
    console.log('[IPv4]', data)
    return dbInit()
    .then()
    .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
}

module.exports = initServer

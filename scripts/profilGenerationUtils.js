const variousIp = require('./ips')
const variousPseudo = require('./pseudo')
const tags = require('./tags')
const _ = require('lodash')

module.exports = {
  variousIp,
  variousPseudo: _.shuffle(variousPseudo),
  tags
}

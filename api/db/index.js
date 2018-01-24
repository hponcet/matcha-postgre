const pg = require('pg')
const dbConfig = require('../config/config').DATABASE

const client = new pg.Client(dbConfig)
client
.connect()
.catch(err => console.log(err))

module.exports = {
  query: (text, params, callback) => {
    return client.query(text, params, callback)
  }
}

const pg = require('pg')
const dbConfig = require('../config/config').DATABASE

const query = async (query, params, callback) => {
  const pool = new pg.Pool(dbConfig)
  const value = await pool.query(query, params)
  await pool.end()
  return value
}

module.exports = {
  query
}

const db = require('../db')

const initDatabase = async () => {
  console.log('[DB] Database initialization')
  await db.query(
    `CREATE TABLE IF NOT EXISTS users(\
      firstname varchar(64),\
      lastname varchar(64),\
      email varchar(64),\
      sex smallint,\
      pseudo varchar(64),\
      birthday varchar(64),\
      password varchar(64),\
      profilId
    )`
  ).catch(err => console.log(err))
  await db.query(
    'CREATE TABLE IF NOT EXISTS tags(firstname varchar(64), lastname varchar(64))'
  ).catch(err => console.log(err))
  await db.query(
    'CREATE TABLE IF NOT EXISTS profils(firstname varchar(64), lastname varchar(64))'
  ).catch(err => console.log(err))
  await db.query(
    'INSERT DATABASE matcha'
  ).catch(err => console.log(err))
}

module.exports = initDatabase

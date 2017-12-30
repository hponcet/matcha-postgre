const validators = require('./validators/matchaValidators')

const MongoClient = require('mongodb').MongoClient
const dbParams = require('../api/config/config').DATABASE
const dbUrl = `${dbParams.dialect}://${dbParams.host}:${dbParams.port}/${dbParams.database}`

const createUsersCollection = (db) => {
  return db.createCollection('users', validators.UsersValidation)
  .then(() => {
    const Users = db.collection('users')
    return Users.createIndex({ email: 1, pseudo: 1 }, { unique: true })
    .then(() => console.log('[DB] Users collection created successfuly.'))
    .catch((err) => { return console.log(err.errmsg) })
  })
  .catch((err) => { return console.log(err.errmsg) })
}

const createProfilsCollection = (db) => {
  return db.createCollection('users', validators.ProfilsValidation)
  .then(() => {
    const Profils = db.collection('profils')
    return Profils.createIndex({ pseudo: 1, userId: 1 }, { unique: true })
    .then(() => Profils.createIndex({ 'location.loc': '2dsphere' })
    .then(() => console.log('[DB] Profils collection created successfuly.'))
    .catch((err) => { return console.log(err.errmsg) }))
    .catch((err) => { return console.log(err.errmsg) })
  })
  .catch((err) => { return console.log(err.errmsg) })
}

const createTagsCollection = (db) => {
  return db.createCollection('tags', validators.TagsValidation)
  .then(() => {
    const Tags = db.collection('tags')
    return Tags.createIndex({ name: 1 }, { unique: true })
    .then(() => console.log('[DB] Tags collection created successfuly.'))
    .catch((err) => { return console.log(err.errmsg) })
  })
  .catch((err) => { return console.log(err.errmsg) })
}

const initDatabase = () => {
  return MongoClient.connect(dbUrl)
  .then((db) => {
    return Promise.all([
      createUsersCollection(db),
      createProfilsCollection(db),
      createTagsCollection(db)
    ])
    .then(() => console.log('[DB] Creation success'))
    .catch((err) => { return console.log(err.errmsg) })
  })
  .catch((err) => { return console.log(err.errmsg) })
}

initDatabase()

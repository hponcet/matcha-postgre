const validators = require('./validators/matchaValidators')
const map = require('lodash/map')

const MongoClient = require('mongodb').MongoClient
const dbParams = require('../config/config').DATABASE
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
  return db.createCollection('profils', validators.ProfilsValidation)
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
  console.log('[DB] Initialization...')
  return MongoClient.connect(dbUrl)
  .then((db) => {
    return new Promise((resolve, reject) => {
      return db.listCollections().toArray((err, collections) => {
        if (err) return reject(err)
        const collectionsList = map(collections, (collection) => collection.name)
        const createCollections = []
        if (collectionsList.indexOf('users') === -1) createCollections.push(createUsersCollection(db))
        if (collectionsList.indexOf('profils') === -1) createCollections.push(createProfilsCollection(db))
        if (collectionsList.indexOf('tags') === -1) createCollections.push(createTagsCollection(db))
        if (createCollections.length === 0) {
          console.log('[DB] Initialization success')
          db.close()
          return resolve()
        }
        return Promise.all(createCollections)
        .then(() => {
          console.log('[DB] Creation success')
          db.close()
          return resolve()
        })
        .catch(reject)
      })
    })
  })
  .catch((err) => { return console.log(err.errmsg) })
}

module.exports = initDatabase

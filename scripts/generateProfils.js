const loremIpsum = require('lorem-ipsum')
const MongoClient = require('mongodb').MongoClient
const ObjectID = require('mongodb').ObjectID

const dbParams = require('../api/config/config').DATABASE
const dbUrl = `${dbParams.dialect}://${dbParams.host}:${dbParams.port}/${dbParams.database}`

const tags = require('./profilGenerationUtils').tags
const pseudo = require('./profilGenerationUtils').variousPseudo
const ips = require('./profilGenerationUtils').variousIp
const getGeolocation = require('../api/services/users').getGeolocation

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
}

const generatePictures = (userSex) => {
  let sex = ''
  userSex === '1' ? sex = 'men' : sex = 'women'
  return `https://randomuser.me/api/portraits/${sex}/${random(0, 99)}.jpg`
}

const randomUniqueArray = (nb, min, max) => {
  let ret = []
  while (ret.length < nb) {
    let rand = random(min, max)
    if (ret.indexOf(rand) > -1) continue
    ret[ret.length] = rand
  }
  return ret
}

const generateArrayRandomly = (array, min, max) => {
  const rand = random(min, max)
  let ret = []
  for (let i = 0; i < rand; i++) ret.push(array[random(0, array.length)])
  return ret
}

const generateHistory = (array, min, max) => {
  const rand = random(min, max)
  let ret = []
  let remoteDate = Date.now()
  for (let i = 0; i < rand; i++) {
    const randOccurence = random(0, array.length - 1)
    remoteDate -= 1000 * 60 * 60 * random(1, 73)
    ret.push({
      time: new Date(remoteDate),
      pseudo: array[randOccurence]
    })
  }
  return ret
}

const generateUniqueHistory = (array, min, max) => {
  const rand = randomUniqueArray(random(min, max), 0, 51)
  let ret = []
  let remoteDate = Date.now()
  for (let i = 0; i < rand.length; i++) {
    const randOccurence = rand[i]
    remoteDate -= 1000 * 60 * 60 * random(1, 73)
    ret.push({
      time: new Date(remoteDate),
      pseudo: array[randOccurence]
    })
  }
  return ret
}

const generatePicturesRandomly = (sex, min, max) => {
  const rand = random(min, max)
  let ret = []
  for (let i = 0; i < rand; i++) {
    ret.push({
      picturePublicPath: generatePictures(sex),
      pictureLocalPath: ''
    })
  }
  return ret
}

const generateUniqueProfil = async (profilPseudo) => {
  const sex = random(1, 3).toString()
  const profil = {
    tags: generateArrayRandomly(tags, 1, 10),
    sex,
    pseudo: profilPseudo,
    location: await getGeolocation(ips[random(0, ips.length)]),
    birthday: new Date(Date.now() - 1000 * 60 * 60 * 24 * 366 * random(18, 80)),
    orientation: random(1, 4).toString(),
    biography: loremIpsum({
      count: random(0, 5),
      units: 'sentences'
    }),
    pictures: generatePicturesRandomly(sex, 1, 5),
    profilPicture: generatePictures(sex),
    history: {
      news: [],
      archived: []
    },
    likes: generateUniqueHistory(pseudo, 0, 25),
    matchs: [],
    userId: new ObjectID()
  }
  return profil
}

const generateProfils = async (nb) => {
  for (let index = 0; index < nb; index++) {
    const profil = await generateUniqueProfil(pseudo[index])
    MongoClient.connect(dbUrl)
    .then((db) => {
      const Profil = db.collection('profils')
      Profil.insertOne(profil)
      .then((data) => console.log(index))
      .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
  }
}

generateProfils(500)

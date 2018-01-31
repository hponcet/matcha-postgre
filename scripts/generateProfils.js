const loremIpsum = require('lorem-ipsum')

const ObjectID = require('mongodb').ObjectID

const tags = require('./profilGenerationUtils').tags
const pseudo = require('./profilGenerationUtils').variousPseudo
const ips = require('./profilGenerationUtils').variousIp
const getGeolocation = require('../api/services/users').getGeolocation

const addPicture = require('../api/services/pictures').addPicture
const db = require('../api/db')

const random = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min)
}

const generatePictures = (userSex) => {
  let sex = ''
  userSex === '1' ? sex = 'men' : sex = 'women'
  return `https://randomuser.me/api/portraits/${sex}/${random(0, 99)}.jpg`
}

const generateArrayRandomly = (array, min, max) => {
  const rand = random(min, max)
  let ret = []
  for (let i = 0; i < rand; i++) ret.push(array[random(0, array.length)])
  return ret
}

const generatePicturesRandomly = async (id, sex) => {
  const rand = random(1, 6)
  for (let index = 0; index < rand; index++) {
    await addPicture('', generatePictures(sex), id)
  }
}

const generateUniqueProfil = async (profilPseudo, index) => {
  const sex = random(1, 3).toString()
  const id = new ObjectID().toString()

  const query = `
    INSERT INTO
    profils("tags", "sex", "pseudo", "location", "birthday", "orientation", "biography", "pictures", "profilPicture", "matchs", "history", "likes", "id")
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11::jsonb, $12, $13)
    RETURNING *`
  const values = [
    generateArrayRandomly(tags, 1, 10),
    sex,
    profilPseudo,
    await getGeolocation(ips[random(0, ips.length)]),
    new Date(Date.now() - 1000 * 60 * 60 * 24 * 366 * random(18, 80)),
    random(1, 4).toString(),
    loremIpsum({
      count: random(0, 5),
      units: 'sentences'
    }),
    [],
    generatePictures(sex),
    [],
    JSON.stringify({news: [], archived: []}),
    [],
    id
  ]

  try {
    const value = await db.query(query, values)
    await generatePicturesRandomly(id, sex)

    console.log(index)
    return
  } catch (err) {
    throw console.log(err.stack)
  }
}

const generateProfils = async (nb) => {
  for (let index = 0; index < nb; index++) {
    try {
      await generateUniqueProfil(pseudo[index], index + 1)
    } catch (err) {
      console.log(err)
      return
    }
  }
}

generateProfils(500)

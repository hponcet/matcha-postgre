const tags = require('../api/services/tags')
const tagsList = require('./tags')

const tagsToDb = async () => {
  try {
    const bufferTags = []
    for (let index = 0; index < tagsList.length; index++) {
      if (bufferTags.indexOf(tagsList[index]) > -1) continue
      bufferTags.push(tagsList[index])
      await tags.addTag(tagsList[index], null)
      console.log(index)
    }
  } catch (err) {
    console.log(err.stack)
  }
}

tagsToDb()

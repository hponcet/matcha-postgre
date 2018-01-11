const ObjectID = require('mongodb').ObjectID

const createNewChat = (db, userProfilId, profilId) => {
  return new Promise((resolve, reject) => {
    const Chat = db.collection('chat')
    Chat.insertOne({
      updated: Date.now(),
      profils: [userProfilId.toString(), profilId.toString()],
      messages: []
    }, (err, data) => {
      if (err) return reject(err)
      return resolve(data.ops[0]._id)
    })
  })
}

const getThread = (db, chatId) => {
  return new Promise((resolve, reject) => {
    const Chat = db.collection('chat')
    Chat.findOne({_id: ObjectID(chatId)}, (err, thread) => {
      if (err) return reject(err)
      return resolve(thread)
    })
  })
}
const getThreadsUpdate = (db, chatId) => {
  return new Promise((resolve, reject) => {
    const Chat = db.collection('chat')
    Chat.findOne({_id: ObjectID(chatId)}, {updated: 1}, (err, thread) => {
      if (err) return reject(err)
      return resolve(thread)
    })
  })
}

const addMessage = (db, message, chatId) => {
  return new Promise((resolve, reject) => {
    const Chat = db.collection('chat')
    Chat.findOneAndUpdate(
      {_id: ObjectID(chatId)},
      {$push: {messages: {
        content: message.content,
        profilId: message.profilId,
        date: message.date}},
        $set: {updated: message.date}},
      (err, data) => {
        if (err) return reject(err)
        return resolve(data.ops)
      }
    )
  })
}

module.exports = {
  createNewChat,
  getThread,
  getThreadsUpdate,
  addMessage
}

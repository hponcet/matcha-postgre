const historyService = require('./history')

const startService = (http) => {
  console.log('[SOCKETS] Socket initialized')
  global.io.client.on('connection', (socket) => {
    socket.on('start', (profilId) => {
      global.io.users[profilId] = socket.id
    })

    socket.on('emit', (profilId) => {
      const socketId = global.io.users[profilId]
      if (socketId && global.io.client.sockets.connected[socketId]) {
        global.io.client.sockets.connected[socketId]
        .emit('notifications', profilId)
      }
    })
  })
}

const likeNotification = async (userProfil, likedProfil) => {
  const notification = {
    type: 'LIKE',
    id: likedProfil.id,
    actionUrl: `/dashboard/profil/${userProfil.id}`,
    profilUrl: `/dashboard/profil/${userProfil.id}`,
    profilPicture: userProfil.profilPicture,
    pseudo: userProfil.pseudo,
    message: ' vous apprécie.'
  }
  await historyService.addNews(likedProfil.id, notification)
  await sendNotification(likedProfil.id, notification)
}

const matchNotification = async (userProfil, likedProfil, chatId) => {
  const matchedNotif = {
    type: 'MATCH',
    id: likedProfil.id,
    actionUrl: `/dashboard/chat?thread=${chatId}`,
    profilUrl: `/dashboard/profil/${userProfil.id}`,
    profilPicture: userProfil.profilPicture,
    pseudo: userProfil.pseudo,
    message: ' et vous avez matché ! Écrivez lui un mot ;)'
  }
  const userNotif = {
    type: 'MATCH',
    id: userProfil.id,
    actionUrl: `/dashboard/chat?thread=${chatId}`,
    profilUrl: `/dashboard/profil/${likedProfil.id}`,
    profilPicture: likedProfil.profilPicture,
    pseudo: likedProfil.pseudo,
    message: ' et vous avez matché ! Écrivez lui un mot ;)'
  }
  await historyService.addNews(likedProfil.id, matchedNotif)
  await historyService.addNews(userProfil.id, userNotif)
  await sendNotification(likedProfil.id, matchedNotif)
  await sendNotification(userProfil.id, userNotif)
}

const sendNotification = (userId, notification) => {
  const socketId = global.io.users[userId]
  if (socketId && global.io.client.sockets.connected[socketId]) {
    return global.io.client.sockets.connected[socketId]
    .emit('notification', notification)
  }
  return Promise.resolve()
}

const sendMessage = (profilId, chatId, message) => {
  const socketId = global.io.users[profilId]
  if (socketId && global.io.client.sockets.connected[socketId]) {
    global.io.client.sockets.connected[socketId]
    .emit(chatId, message)
  }
  return Promise.resolve()
}

module.exports = {
  startService,
  likeNotification,
  matchNotification,
  sendNotification,
  sendMessage
}

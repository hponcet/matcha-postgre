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
  sendNotification,
  sendMessage
}

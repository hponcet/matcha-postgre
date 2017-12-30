module.exports = (http) => {
  const io = require('socket.io')(http)

  console.log('[SOCKETS] Socket initialized')
  io.on('connection', (socket) => {
    socket.on('chat', (object) => {
      console.log(object)
    })
  })
}

export const connectSocket = (profilId) => {
  window.matcha.socket.emit('start', profilId)
}

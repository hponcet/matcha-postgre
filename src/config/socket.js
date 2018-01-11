export const initSocket = (profilId) => {
  console.log('socket initialized')
  window.matcha.socket.emit('start', () => {
    console.log('start')
    return profilId
  })
  window.matcha.socket.on('like', (profil) => {
    console.log(`${profil} vous aime bien`)
  })
}

const chatService = require('../services/chat')
const socketService = require('../services/socket')

const getThreads = async (req, res, next) => {
  try {
    const { userId } = req.token
    const threads = await chatService.getThreads(userId)

    console.log('threads:', threads)

    return res.send(threads)
  } catch (err) {
    return err
  }
}

const getThread = async (req, res, next) => {
  try {
    const { chatId } = req.body

    const messages = await chatService.getThread(chatId)
    const thread = {
      chatId,
      messages
    }

    console.log('threads:', thread)

    return res.send(thread)
  } catch (err) {
    return err
  }
}

const sendMessage = async (req, res, next) => {
  try {
    const { userId } = req.token
    const { message } = req.body

    const dbMessage = await chatService.addMessage(userId, message)
    await socketService.sendMessage(message.destId, message.chatId, dbMessage)

    return res.send()
  } catch (err) {
    return err
  }
}

module.exports = {
  getThread,
  sendMessage,
  getThreads
}

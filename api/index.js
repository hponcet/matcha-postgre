const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config/config')
const app = express()
const path = require('path')
const http = require('http').Server(app)

const serverInit = require('./config/server-init')

const corsMiddleware = require('./middlewares/cors')
const errorsHandlingMiddleware = require('./middlewares/errors-handling').errorsHandling

const authenticationRouter = require('./routes/authentication')
const usersRouter = require('./routes/users')
const corsRouter = require('./routes/cors')
const tagsRouter = require('./routes/tags')
const historyRouter = require('./routes/history')
const chatRouter = require('./routes/chat')
const profilRouter = require('./routes/profil')

global.io = {
  client: require('socket.io')(http),
  users: []
}

app.use('/files/pictures', express.static(path.join(__dirname, '../files/pictures')))
app.use('/files/assets', express.static(path.join(__dirname, '../files/assets')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(corsMiddleware)

app.use('/', authenticationRouter)
app.use('/', usersRouter)
app.use('/', corsRouter)
app.use('/', tagsRouter)
app.use('/', historyRouter)
app.use('/', chatRouter)
app.use('/', profilRouter)
app.use(errorsHandlingMiddleware)

serverInit(http).then(() => {
  const server = http.listen(config.PORT, () => {
    console.log(`[SERVER] ${config.APP_NAME} now running on port ${server.address().port}`)
  })
})

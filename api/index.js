const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config/config')
const app = express()
const path = require('path')

const serverInit = require('./config/server-init')

const corsMiddleware = require('./middlewares/cors')
const errorsHandlingMiddleware = require('./middlewares/errors-handling').errorsHandling

const authenticationRouter = require('./routes/authentication')
const usersRouter = require('./routes/users')
const corsRouter = require('./routes/cors')
const tagsRouter = require('./routes/tags')
const profilRouter = require('./routes/profil')
const picturesRouter = require('./routes/pictures')

app.use('/files/pictures', express.static(path.join(__dirname, '../files/pictures')))
app.use('/files/assets', express.static(path.join(__dirname, '../files/assets')))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(corsMiddleware)

app.use('/', authenticationRouter)
app.use('/', usersRouter)
app.use('/', corsRouter)
app.use('/', tagsRouter)
app.use('/', profilRouter)
app.use('/', picturesRouter)
app.use(errorsHandlingMiddleware)

serverInit().then(() => {
  let server = app.listen(config.PORT, () => {
    console.log(`[SERVER] ${config.APP_NAME} now running on port ${server.address().port}`)
  })
})

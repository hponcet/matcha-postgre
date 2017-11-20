const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config/config')
const logo = require('./config/asciilogo')
const app = express()

const corsMiddleware = require('./middlewares/cors')
const errorsHandlingMiddleware = require('./middlewares/errors-handling').errorsHandling

const authenticationRouter = require('./routes/authentication')
const usersRouter = require('./routes/users')
const corsRouter = require('./routes/cors')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(corsMiddleware)

app.use('/', authenticationRouter)
app.use('/', usersRouter)
app.use('/', corsRouter)
app.use(errorsHandlingMiddleware)

let server = app.listen(config.PORT, () => {
  console.log(logo)
  console.log(`${config.APP_NAME} now running on port ${server.address().port}`)
})

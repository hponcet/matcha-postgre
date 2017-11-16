const express = require('express')
const bodyParser = require('body-parser')
const config = require('./config/config')
const logo = require('./config/asciilogo')
const app = express()

const authenticationRouter = require('./routes/authentication')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use('/', authenticationRouter)

let server = app.listen(config.PORT, () => {
  console.log(logo)
  console.log(`${config.APP_NAME} now running on port ${server.address().port}`)
})

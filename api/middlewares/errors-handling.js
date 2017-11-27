const ErrorStackParser = require('error-stack-parser')

const errorsHandling = (err, req, res, next) => {
  console.error(err.message)

  if (!err.statusCode) {
    console.log(err, ErrorStackParser.parse(err))
  }

  if (res.headersSent) {
    return next(err)
  }

  if (!err.statusCode) {
    return next(err)
  }

  err.json = {
    code: err.message
  }
  res.status(err.statusCode).json(err.json)
}

module.exports = {
  errorsHandling
}

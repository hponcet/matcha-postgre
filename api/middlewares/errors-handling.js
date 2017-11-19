const _ = require('lodash')
const ErrorStackParser = require('error-stack-parser')

const errorsHandling = (err, req, res, next) => {
  console.error(
    JSON.stringify(_.assign(
      {
        message: err.message
      },
      err.meta,
      {
        status: err.statusCode || 500,
        route: req.path,
        token: req.token,
        stack: !err.statusCode ? ErrorStackParser.parse(err) : null
      }
    ))
  )

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
  res.status(err.statusCode).json(err.message)
}

module.exports = {
  errorsHandling
}

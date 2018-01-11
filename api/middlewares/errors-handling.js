const errorsHandling = (err, req, res, next) => {
  console.error('[ERROR]', err.message)

  if (res.headersSent) return next(err)
  if (!err.statusCode) return next(err)

  err.json = { code: err.message }
  res.status(err.statusCode).json(err.json)
}

module.exports = {
  errorsHandling
}

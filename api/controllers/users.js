const UsersService = require('../services/users')

const getUser = async (req, res, next) => {
  try {
    const user = await UsersService.getById(req.token.userId)
    return res.send(user)
  } catch (err) {
    return next(err)
  }
}

module.exports = {
  getUser
}

const authService = require('./../../app/services/authService')

/**
 * Login
 *
 * @param req
 * @param res
 * @param next
 * @returns JSON
 */
const login = async (req, res, next) => {
  const result = await authService.login(req, res, next)

  return res.json({
    code: global.STATUS_CODES.OK,
    message: res.__('statusCodes.OK'),
    data: result
  })
}

module.exports = {
  login
}

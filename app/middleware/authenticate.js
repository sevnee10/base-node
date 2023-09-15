const authService = require('../services/authService')

module.exports = async (req, res, next) => {
  const authHeader = req.headers['authorization']
  let token = ''
  if (authHeader) token = authHeader.replace('Bearer ', '')

  const auth = authService.verifyToken(token)

  if (!auth) {
    return res.status(global.STATUS_CODES.UNAUTHORIZED).json({
      code: global.STATUS_CODES.UNAUTHORIZED,
      message: global.trans('statusCodes.UNAUTHORIZED')
    })
  }

  req.auth = auth

  return next()
}

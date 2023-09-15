const { validationResult } = require('express-validator')

module.exports = async (validations, req, res, next) => {
  await Promise.all(validations.map(validation => validation.run(req)))

  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }

  return res.json({
    code: global.STATUS_CODES.BAD_REQUEST,
    message: global.trans('statusCodes.BAD_REQUEST'),
    data: errors.array()
  })
}

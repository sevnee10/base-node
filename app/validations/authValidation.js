const baseValidation = require('./baseValidation')

module.exports = type => async (req, res, next) => {
  let validations = []

  if (type === 'login') {
    validations = [
      ...global.bodyValidation('email', { notEmpty: true }),
      ...global.bodyValidation('password', { notEmpty: true, isString: true }),
    ]
  }

  return baseValidation(validations, req, res, next)
}

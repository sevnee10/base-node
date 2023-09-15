const jwt = require ('jsonwebtoken')
const bcrypt = require('bcryptjs')
const User = require('../models/user')
const moment = require('moment')

const login = async(req, res, next) => {
  const input = req.body

  const user = await User.findOne({ email: input.email })
  if (!user) 
    return res.json({
      code: global.STATUS_CODES.UNAUTHORIZED,
      message: res.__('auth.login.email')
    })
  
  const isValidPassword = compare(input.password, user.password)
  if (!isValidPassword)
    return res.json({
      code: global.STATUS_CODES.UNAUTHORIZED,
      message: res.__('auth.login.password')
    })

  return generateToken({
    _id: user._id
  })
}

/**
 * Encrypt password
 * 
 * @param password
 * @returns {*}
 */
const encryptPassword = password => {
  const salt = bcrypt.genSaltSync(10);

  return bcrypt.hashSync(password, salt);
};

/**
 * Compare password when user login
 * 
 * @param password
 * @param hashedPassword
 */
const compare = (password, hashedPassword) =>
  bcrypt.compareSync(password, hashedPassword);

/**
 * Generate token
 *
 * @returns {{expiry_date: string, token: (*)}}
 */
const generateToken = function (input) {
  const expiresIn = process.env.JWT_EXPIRY || 86400
  const token = jwt.sign(input, process.env.JWT_SECRET, {
    expiresIn: expiresIn
  })

  return {
    expiry_date: moment().add(expiresIn, 'seconds').toISOString(),
    token: token
  }
}

// const register = ()

module.exports = {
  login,
  encryptPassword,
  compare,
  generateToken
}

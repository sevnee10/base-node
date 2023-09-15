const baseSchema = require('./baseSchema')
const { Schema } = require('mongoose')

module.exports = global.database.model(
  'users',
  baseSchema({
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      default: 'user',
    },
    address: {
      type: String,
      required: false,
      trim: true,
      default: null,
    },
  })
)

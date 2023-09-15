const { Schema } = require('mongoose')
const basePlugin = require('./plugins/basePlugin')

module.exports = (definition, options) => {
  const schema = new Schema(definition, {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at'
    },
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
    ...options
  })

  basePlugin(schema)

  return schema
}
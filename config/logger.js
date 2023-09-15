const { createLogger, format, transports } = require('winston')
const { combine, timestamp, printf } = format
const path = require('path')
const moment = require('moment')

const customFormat = printf(({ message, timestamp }) => {
  if (typeof message === 'object') message = JSON.stringify(message)
  return `${moment(timestamp).format('YYYY-MM-DD HH:mm:ss')}: ${message}`
})

global.logger = createLogger({
  format: combine(timestamp(), customFormat),
  transports: [
    new transports.File({
      level: 'info',
      name: 'info',
      filename: path.resolve(__dirname, '../storage/logs/info.log'),
      json: false
    }),
    new transports.File({
      level: 'error',
      name: 'error',
      filename: path.resolve(__dirname, '../storage/logs/error.log'),
      json: false
    })
  ]
})

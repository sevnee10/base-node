const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const StatusCodes = require('http-status-codes')
const http = require('http')
const path = require("path");

require('dotenv').config()
const app = express()
const server = http.createServer(app)

app.use(morgan('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(process.env.PREFIX || '', express.static(path.join(__dirname, 'public'), { extensions: ['html'] }))

const init = async () => {
  global.STATUS_CODES = StatusCodes
  require('./config/common')
  require('./config/logger') // Logger
  require('./config/i18n')(app) // I18n
  await require('./config/database')() // Connect database
  // require('./config/redis') // Start redis server
  require('./routes')(app) // Routing
  require('./app/helpers') // Helper function
  require('./config/bootstrap') // Handle when server start
}

init().then()

const port = process.env.PORT || '7698'
app.set('port', port)
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */
function onListening() {
  const addr = server.address()
  const bind = typeof addr === 'string'
    ? 'pipe ' + addr
    : 'port ' + addr.port
}

module.exports = app

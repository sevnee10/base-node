const i18n = require('i18n')

module.exports = function (app) {
  i18n.configure({
    locales: ['en'],
    defaultLocale: 'en',
    directory: __dirname + '/../lang',
    autoReload: false
  })

  app.use(i18n.init)
  global.trans = i18n.__
}

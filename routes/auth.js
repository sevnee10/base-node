let router = require('express').Router()
let authController = require('./../app/controllers/authController')
let authValidation = require('../app/validations/authValidation')

router.post('/login', authValidation('login'), authController.login)

module.exports = router

const express = require('express');
const router = express.Router()
const home = require('./home')
const login = require('./login')

router.use('/', home)
router.use('/user', login)

module.exports = router
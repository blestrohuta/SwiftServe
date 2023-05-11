const express = require('express');
const router = express.Router()
const first = require('./firstRoute');
const second = require('./secondRoute');

router.use('/', first)
router.use('/', second)

module.exports = router
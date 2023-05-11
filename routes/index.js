const express = require('express');
const router = express.Router()
const Controller1 = require('../controllers/alfan')
const Controller2 = require('../controllers/blestro')

router.get('/',)               //home page: ada login dan register

router.get('./login')            //ada userId         
router.get('/register',)
router.post('/register',)

router.get('/user/:userId/profile',)

router.get('/item/:userId',)   //add button add, filer, sort

router.get('/logout/:userId')
//-------------

router.get('/order/:userId',)

router.get('/order/add/:userId/:itemId',)
router.post('/order/add/:userId:itemId',)

router.get('/order/delete/:orderDemandId',)
router.get('/order/detail/:orderDemandId',)
router.get('/order/update/:orderDemandId',)   //status



module.exports = router
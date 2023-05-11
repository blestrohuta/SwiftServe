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


router.get('/order/add/:userId/:itemId',Controller1.getAddOrderByUserId)
router.post('/order/add/:userId/:itemId',Controller1.postAddOrderByUserId)

router.get('/order/delete/:userId/:orderDemandId',Controller1.deleteOrder)
router.get('/order/detail/:userId/:orderDemandId',Controller1.orderDetail)
router.get('/order/update/:userId/:orderDemandId',Controller1.updateOrder)   //status

router.get('/order/:userId', Controller1.orderByUserId)


module.exports = router
const express = require('express');
const router = express.Router()
const Controller1 = require('../controllers/alfan')
const Controller2 = require('../controllers/blestro')

router.get('/', Controller2.home)

router.get('/login', Controller2.loginForm)
router.post('/login', Controller2.postLogin)
router.get('/register', Controller2.registerForm)
router.post('/register', Controller2.postRegister)

router.use((req, res, next) => {
    if (!req.session.userId) {
        const error = "Please login first!"
        res.redirect(`/login?error=${error}`)
    } else {
        next()
    }
})

router.get('/logout', Controller2.logOut)

router.get('/user/profile', Controller2.profile)

router.get('/item', Controller2.item)
// router.post('/item', Controller2.addItemtoOrder)
router.post('/item', Controller2.addItemtoOrder)

//-------------


router.get('/order/add/:userId/:itemId', Controller1.getAddOrderByUserId)
router.post('/order/add/:userId/:itemId', Controller1.postAddOrderByUserId)

router.get('/order/delete/:userId/:orderDemandId', Controller1.deleteOrder)
router.get('/order/detail/:userId/:orderDemandId', Controller1.orderDetail)
router.get('/order/update/:userId/:orderDemandId', Controller1.updateOrder)   //status

router.get('/order/:userId', Controller1.orderByUserId)


module.exports = router
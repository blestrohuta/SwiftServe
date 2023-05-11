const express = require('express');
const router = express.Router()
const Controller1 = require('../controllers/alfan')
const Controller2 = require('../controllers/blestro')

router.get('/', Controller2.home)                       //home page: ada login dan register

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

//-------------

router.get('/order/:userId',)

router.get('/order/add/:userId/:itemId',)
router.post('/order/add/:userId:itemId',)

router.get('/order/delete/:orderDemandId',)
router.get('/order/detail/:orderDemandId',)
router.get('/order/update/:orderDemandId',)   //status



module.exports = router
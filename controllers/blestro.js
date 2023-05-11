const { User, Profile, Item } = require('../models')
const bcrypt = require('bcryptjs')
const { Op } = require("sequelize");

class Controller {
    static home(req, res) {
        res.render('home')
    }
    static loginForm(req, res) {
        const { error } = req.query
        res.render('loginForm', { error })
    }

    static postLogin(req, res) {
        const { username, password } = req.body
        User.findOne({
            where: { username }
        })
            .then(user => {
                if (user) {
                    const isValidPassword = bcrypt.compareSync(password, user.password)
                    if (isValidPassword) {
                        //berhasil login
                        req.session.userId = user.id
                        return res.redirect('/')
                    } else {
                        const error = "invalid username/password"
                        return res.redirect(`/login?error=${error}`)
                    }
                } else {
                    const error = "invalid username/password"
                    return res.redirect(`/login?error=${error}`)
                }
            })
            .catch(err => {
                res.send(err)
            })
    }

    static registerForm(req, res) {
        res.render('registerForm')
    }

    static postRegister(req, res) {
        const { username, email, password, role } = req.body
        User.create({ username, email, password, role })
            .then(newUser => {
                res.redirect('login')
            })
            .catch(err => {
                if (err.name == "SequelizeValidationError") {
                    const error = err.errors.map(el => el.message)
                    res.send(error)
                } else {
                    res.send(err)
                }
            })
    }

    static logOut(req, res) {
        req.session.destroy((err) => {
            if (err) {
                res.send(err)
            } else {
                res.redirect('/')
            }
        })
    }

    static profile(req, res) {
        Profile.findAll({
            where: {
                UserId: req.session.userId
            }
        })
            .then(profile => {
                res.render('profile', { profile })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static item(req, res) {
        Item.findAll({
        })
            .then(item => {
                const formattedPrice = item.map(el => {
                    return Item.formatPrice(el.price)
                })
                console.log(formattedPrice);
                res.render('item', { item, formattedPrice })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static addItemtoOrder(req, res) {
        res.redirect(`/order/add/${req.session.userId}/${req.body.itemId}`)
    }
}

module.exports = Controller
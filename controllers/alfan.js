const formatNumber = require('../helpers/helper')
const { Category, Item, OrderDemand, Profile, User } = require('../models')
// var nodemailer = require('nodemailer');

class Controller1 {
    static orderByUserId(req, res) {
        const { userId } = req.params
        OrderDemand.findAll({ include: { all: true } })
            .then(order => {
                res.render('orderPerUser', { order, userId })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static getAddOrderByUserId(req, res) {
        let msg;
        if (req.query.errors) {
            msg = req.query.errors.split(',');
        }
        const { userId, itemId } = req.params

        res.render('formAddOrder', { userId, itemId, msg })
    }

    static postAddOrderByUserId(req, res) {

        // let transporter = nodemailer.createTransport({
        //     service: 'gmail',
        //     auth: {
        //         type: 'OAuth2',
        //         user: 'ranirilearning@gmail.com',
        //         pass: 'ranirilearning123',
        //         clientId: '1096894214240-su0qk9uv8ojtnnpfvr11m7ea4na8pk49.apps.googleusercontent.com',
        //         clientSecret: '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',
        //         refreshToken: '1//04cJChGIdiap8CgYIARAAGAQSNwF-L9IrGOsQIEfeaovhxo1EcqF2lzWdqMseycOtbZTd5t7f63i6qBOQveXq1pyiMwhd2uzZzz8',
        //         tls: {
        //             rejectUnauthorized: false
        //         }
        //     }
        // });

        const { userId, itemId } = req.params
        const { startDate, duration } = req.body
        let price;
        Item.findByPk(itemId)
            .then(item => {
                if (price) {
                    price = item.price * duration
                }
                const newOrder = { UserId: userId, ItemId: itemId, startDate, duration, price }
                return OrderDemand.create(newOrder)
            })
            .then(order => {
                return User.findByPk(userId)
            })
            .then(user => {
                res.redirect(`/order/${userId}`)

                // let mailOptions = {
                //     from: 'ranirilearning@gmail.com',
                //     to: `ranirilearning@gmail.com`,
                //     subject: 'pair project phase 1',
                //     text: 'Hi from pair project phase 1'
                // };

                // transporter.sendMail(mailOptions, function (err, data) {
                //     if (err) {
                //         console.log("Error " + err);
                //     } else {
                //         console.log("Email sent successfully");
                //     }
                // });
            })
            .catch(err => {
                if (err.name == 'SequelizeValidationError') {
                    const errors = err.errors.map(el => {
                        return el.message
                    });
                    res.redirect(`/order/add/${userId}/${itemId}?errors=${errors}`)
                } else {
                    console.log(err);
                    res.send(err)
                }
            })
    }

    static deleteOrder(req, res) {
        const { orderDemandId, userId } = req.params
        OrderDemand.destroy({
            where: {
                id: orderDemandId
            }
        })
            .then(order => {
                res.redirect(`/order/${userId}`)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static orderDetail(req, res) {
        const { orderDemandId, userId } = req.params
        OrderDemand.findByPk(orderDemandId, {
            include: ['Item']
        })
            .then(order => {
                res.render('orderDetail', { order, formatNumber })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static updateOrder(req, res) {
        const { orderDemandId, userId } = req.params
        OrderDemand.findByPk(orderDemandId, { include: ['Item'] })
            .then(order => {
                const duration = order.duration + 1;
                const price = order.Item?.price * duration;
                return OrderDemand.update({ duration, price }, {
                    where: {
                        id: orderDemandId
                    }
                })
            })
            .then(order => {
                res.redirect(`/order/detail/${userId}/${orderDemandId}`)

            })
            .catch(err => {
                res.send(err)
            })
    }
}

module.exports = Controller1
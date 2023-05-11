const { Category, Item, OrderDemand, Profile, User } = require('../models')

class Controller1 {
    static orderByUserId(req, res) {
        const { userId } = req.params
        OrderDemand.findAll({ include: { all: true } })
            .then(order => {
                // console.log(order);
                res.render('orderPerUser', { order, userId })
            })
            .catch(err => {
                res.send(err)
            })
    }

    static getAddOrderByUserId(req, res) {
        const { userId, itemId } = req.params
        res.render('formAddOrder', { userId, itemId })
    }

    static postAddOrderByUserId(req, res) {
        const { userId, itemId } = req.params
        const { startDate, duration } = req.body
        let price;
        Item.findByPk(itemId)
            .then(item => {
                price = item.price * duration
                const newOrder = { UserId : userId, ItemId : itemId, startDate, duration, price }
                console.log(newOrder);
                return OrderDemand.create(newOrder)
            })
            .then(order => {
                // console.log(order);
                res.redirect(`/order/${userId}`)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static deleteOrder(req, res) {
        const {orderDemandId, userId} = req.params
        OrderDemand.destroy({where: {
            id: orderDemandId
        }})
            .then(order => {
                res.redirect(`/order/${userId}`)
            })
            .catch(err => {
                res.send(err)
            })
    }

    static orderDetail(req, res) {
        const {orderDemandId, userId} = req.params
        OrderDemand.findByPk({id: orderDemandId})
            .then(order => {
                console.log(order);
            })
            .catch(err => {
                res.send(err)
            })
    }

    static updateOrder(req, res) {

    }
}

module.exports = Controller1